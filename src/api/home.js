import {get} from './http'

const apiBanner = p => get('/banner', p)
const apiPlaylist = p => get('/personalized', p)
export default {
    apiBanner,
    apiPlaylist
}
