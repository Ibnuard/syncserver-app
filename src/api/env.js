//API ENV

//EXAMPLE
export const BASE_URL = 'https://script.google.com/macros/s/AKfycbxh6nH-XfprGodkDEFXPv35V53f9MRyk8Dl9ghhjXzk_KFT8KmSoDyM1p-ZZHVD49bPTw/exec?action='
export const EX_POST = 'posts/'
export const EX_GET_POST = (ID) => {
    return `posts/${ID}`
}

export const GET_USER_LOCATION = (lat, long) => {
    return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
}

export const UPLOAD_CONTACT = 'https://script.google.com/macros/s/AKfycbzUBLTc1KrNw418c4uuFRzmB50QbRyrp8N58FdbZdXLwhw9OQIhvuXvjTwFmY93_Hyt/exec?action=uploadContact'
export const GET_CONFIG = 'https://script.google.com/macros/s/AKfycbzUBLTc1KrNw418c4uuFRzmB50QbRyrp8N58FdbZdXLwhw9OQIhvuXvjTwFmY93_Hyt/exec?action=getConfig'
export const NORMALIZE = 'https://script.google.com/macros/s/AKfycbzUBLTc1KrNw418c4uuFRzmB50QbRyrp8N58FdbZdXLwhw9OQIhvuXvjTwFmY93_Hyt/exec?action=normal'