export class Albums {
  constructor({id, name, imgUrl, artists, time, type}) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.time = time,
    this.type = type
  }
}

export class songsList {
  constructor({id, name, imgUrl, artists, subType, time, songUrl, dt}) 
  {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.subType = subType
    this.time = time
    this.songUrl = songUrl
    this.dt = dt
  }
}

export class NewSongs {
  constructor({id, name, imgUrl, artists, subType}) 
  {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl
    this.artists = artists
    this.subType = subType
  }
}
