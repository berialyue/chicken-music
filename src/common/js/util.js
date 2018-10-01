import songAPI from 'api/song'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let newArr = arr.slice()
  for (let i = 0; i < newArr.length; i++) {
    let j = getRandomInt(0, i)
    let t = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = t
  }
  return newArr
}

export function deleteNull(list) {
  let i = list.length
  while (i--) {
    if (list[i].url === null) {
      list.splice(i, 1)
    }
  }
  return list
}

export function getSongUrl(list) {
  let flag = 0
  list.forEach((item, index, array) => {
    songAPI.getSongUrl(item.id).then(res => {
      if (res.data.code === 200) {
        item.url = res.data.data[0].url
      }
      flag++
      if (flag === array.length) {
        deleteNull(array)
      }
    })
  })
  return list
}
