const keyEntityConvert = arr => {
  return arr.map(el => {
    switch (el[0]) {
      case 'Release Year':
        return ['release_year', +el[1]]
      default:
        return [el[0].toLowerCase(), el[1]]
    }
  })
}


module.exports = keyEntityConvert
