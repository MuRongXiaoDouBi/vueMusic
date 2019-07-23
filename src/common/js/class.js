export class Albums {
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

export class NewSongs {
  constructor({
    id,
    name,
    imgUrl,
    artists,
    subType
  }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.subType = subType
  }
}

export default {
  Albums,
  NewSongs
}