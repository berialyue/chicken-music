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
}

export function createSong(songs) {
  return new Song({
    id: songs.id,
    name: songs.name,
    duration: songs.dt,
    singer: filterSinger(songs.ar),
    album: songs.al.name,
    image: songs.al.picUrl,
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
