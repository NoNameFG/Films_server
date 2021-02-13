const mongoose = require('mongoose')

const Schema = mongoose.Schema
const FilmSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  release_year: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    enum: ['DVD', 'VHS', 'Blu-Ray'],
    required: true
  },
  stars: {
    type: String,
    required: true
  }
}, {collection: 'film'})

const FilmModel = mongoose.model('FilmModel', FilmSchema)

module.exports = FilmModel
