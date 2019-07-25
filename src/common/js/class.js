export class Albums {
  constructor({
    id,
    name,
    imgUrl,
    artists,
    time,
    type
  }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.time = time,
    this.type = type
  }
}

export class NewSongs {
  constructor({
    id,
    name,
    imgUrl,
    artists,
    subType,
    time
  }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.subType = subType,
    this.time = time
  }
}


export default {
  Albums,
  NewSongs
}