/* eslint-disable no-extend-native */

export const listMaker = (n = 10) => {
  const list = []
  for (let i = 0; i < n; i++) {
    list.push({
      id: i,
      name: `List item ${i}`
    })
  }
  return list
}

/**
 * Bu ve altındaki highlihtStringWithTag metodları kütüphane import edilince kaldırılacak
 */
String.prototype.replaceAt = function (index, replacement, search) {
  return this.substr(0, index) + replacement + this.substr(index + search.length)
}

export const highlihtStringWithTag = (text, search, className = 'bold-text') => {
  let arrText = text.split(' ')

  arrText = arrText.length > 0 ? [text] : arrText
  const arrResult = arrText.map((textVal) => {
    const searchLower = search.toLocaleLowerCase('tr')
    const textValLower = textVal.toLocaleLowerCase('tr')

    const index = textValLower.indexOf(searchLower)
    const subText = textVal.substr(index, search.length)
    const result = index === -1 ? textVal : textVal.replaceAt(index, "<span class='" + className + "'>" + subText + '</span>', search)
    return result
  })

  const str = arrResult.join(' ')

  return str
}

export const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

export const generateRandomPoints = (center, radius, count) => {
  const points = []
  for (let i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius))
  }
  return points
}

const generateRandomPoint = (center, radius) => {
  const x0 = center.lng
  const y0 = center.lat
  const rd = radius / 111300

  const u = Math.random()
  const v = Math.random()

  const w = rd * Math.sqrt(u)
  const t = 2 * Math.PI * v
  const x = w * Math.cos(t)
  const y = w * Math.sin(t)

  const xp = x / Math.cos(y0)

  return { lat: y + y0, lng: xp + x0 }
}
