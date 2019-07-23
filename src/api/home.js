import {get} from './http'

const apiBanner = p => get('/banner', p)
const apiNewAlbum = p => get('/album/newest', p)
const apiPlaylist = p => get('/personalized', p)
export default {
    apiBanner,
    apiPlaylist,
    apiNewAlbum
}
