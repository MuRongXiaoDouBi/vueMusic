export function initArtists (list) {
  let i = []
  list.map(item => {
    i.push(item.name)
  })
  return i.join('/')
} 

export default {
  initArtists
}