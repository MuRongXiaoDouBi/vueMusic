import {get} from './http'

const apiAlbum = p => get('/album', p) // 获取专辑详情及列表
const apiSongs = p => get('//song/detail', p) // 获取歌曲详情
export default {
  apiAlbum,
  apiSongs
}
