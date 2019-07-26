import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 播放器状态
  playlist: [], // 歌曲列表
  sequenceList: [], // 歌曲播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放歌曲索引
}

export default state