export default class Albums {
  constructor({
    id,
    name,
    imgUrl,
    artists
  }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
  }
}

Albums.initArtists = function (list) {
  let i = []
  list.map(item => {
    i.push(item.name)
  })
  return i.join('/')
}