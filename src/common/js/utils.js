import moment from 'moment'
import api from 'api/api'
export function initArtists(list) {
  if (typeof list !== 'object') {
    return list
  }
  let i = []
  list.map(item => {
    i.push(item.name)
  })
  return i.join('/')
}

export function dateFormat(date) {
  return moment(date).format('YYYY-MM-DD')
}
export function timeFormat(time) {
  return moment(time).format('mm:ss')
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export async function getSongUrl(id) {
  const ids = id.join(',')
  const {
    data
  } = await api.list.apiSongUrl({
    id: ids
  })
  return data
}