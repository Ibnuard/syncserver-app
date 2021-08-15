import axios from 'axios'
import { BASE_URL } from './env'

export const fetchApi = async (url = '', customUrl = false, method = 'post', body = {}, customHeader = {}, timeout = 5000) => {
    return axios({
        method: method,
        url: customUrl ? url : `${BASE_URL}${url}`,
        timeout: timeout,
        headers: {
            ...customHeader,
            'Content-type': 'Application/json',
            Accept: 'Application/json',
        },
        data: method == 'get' ? '' : body,
    })
}