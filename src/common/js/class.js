import api from 'api/api'
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

export class SongsList {
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
  getLyric() {
    if(this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      api.list.apiLyric({
        id: this.id
      })
        .then(res => {
          if(res.lrc.lyric) {
            this.lyric = res.lrc.lyric
            resolve(this.lyric)
          } else {
            reject('no lyric')
          }
        })
    })
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
