const keyEntityConvert = require('./keyEntityConvert.js')

const txtToJSON = (str) => {
  const arrayFromStr = str.split(/\r?\n/)

  const keyValueArr = arrayFromStr
    .filter(el => el !== '')
    .map(el => el.split(': '))

  const newKeysArr = keyEntityConvert(keyValueArr)

  let objArray = []
  let exactArr = []
  let j = 0

  newKeysArr.forEach(el => {
    objArray.push(el)
    j++
    if(!(j % 4)){
      exactArr.push(objArray)
      objArray = []
    }
  })

  return exactArr.map(el => Object.fromEntries(el))
}


module.exports = txtToJSON
