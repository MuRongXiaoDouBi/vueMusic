import moment from 'moment'
import api from 'api/api'
export function initArtists (list) {
  if (typeof list !== 'object'){
    return list
  }
  let i = []
  list.map(item => {
    i.push(item.name)
  })
  return i.join('/')
} 

export function dateFormat (date) {
  return moment(date).format('YYYY-MM-DD')
}
export function timeFormat (time) {
  return moment(time).format('mm:ss')
}

export async function  getSongUrl (id) {
  const ids = id.join(',')
  const {data} = await api.list.apiSongUrl({
    id: ids
  })
  return data
}
