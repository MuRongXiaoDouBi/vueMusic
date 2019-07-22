import {get, post} from './http'

const apiSinger = p => get('/top/artists', p)
export default {
    apiSinger
}
