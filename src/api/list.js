import {get} from './http'

const apiAlbum = p => get('/album', p) // 获取专辑详情及列表

export default {
  apiAlbum
}
