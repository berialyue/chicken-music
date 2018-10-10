import songAPI from 'api/song'

export default class Song {
  constructor({id, name, singer, album, duration, image, url}) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      songAPI.getLyric(this.id).then((res) => {
        if (res.data.code === 200) {
          if (res.data.nolyric || res.data.uncollected) {
            this.lyric = 'noLyric'
            console.log(this.lyric)
          } else if (res.data.lrc.lyric) {
            this.lyric = res.data.lrc.lyric
          } else {
            this.lyric = ''
          }

          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(songs) {
  return new Song({
    id: songs.id,
    name: songs.name,
    duration: songs.dt / 1000,
    singer: filterSinger(songs.ar),
    album: songs.al.name,
    image: songs.al.picUrl,
    url: ''
  })
}

export function createSearchSong(songs) {
  return new Song({
    id: songs.id,
    name: songs.name,
    duration: songs.duration / 1000,
    singer: filterSinger(songs.artists),
    album: songs.album.name,
    image: songs.album.artist.img1v1Url,
    url: ''
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
