const FilmModel = require('../models/film.js')
const txtToJSON = require('../Functions/txtToJSON.js')
const _ = require('lodash')


class SiteController{
  async add_films(req, resp){
    let body = req.body

    let errorData = {
      status: false,
      data: {}
    }

    if(!Object.keys(body).length){
      req.pipe(req.busboy)
      await req.busboy.on('file', (fieldname, file, filename) => {
        let fileExtantion = filename.split('.')
        if(fileExtantion[fileExtantion.length-1].toLowerCase() !== 'txt'){
          errorData = {
            status: true,
            data: {message: 'File must be .txt'}
          }
          return
        }
        file.on('data', (data) => {
          body = txtToJSON(data.toString())
        })
      })
    }

    if(errorData.status) return resp.status(400).json(errorData.data)


    const filmList = await FilmModel.find({}, {_id: 0, __v: 0})

    body = body.map(el => {
      return {
        ...el,
        stars: [...new Set(el.stars.split(', '))].join(', ')
      }
    })

    body = body.filter(el => {
      for(let i = 0; i < filmList.length; i++){
        const obj = {
          title: filmList[i].title,
          release_year: filmList[i].release_year,
          format: filmList[i].format,
          stars: filmList[i].stars
        }
        if(_.isEqual(el, obj)) return false
      }
      return true
    })

    if(!body.length) return resp.status(400).json({message: 'No unique items'})

    await FilmModel.insertMany(body, (error) => {
       if(error){
         errorData = {
           flag: true,
           data: error
         }
       }
    })

    if(errorData.status) return resp.status(400).json(errorData.data)

    resp.status(200).json({message: 'success'})
  }

  async delete_film(req, resp){
    const body = req.query

    await FilmModel.findOneAndDelete({_id: body._id}, (error) => {
        if(error){
          return resp.status(400).json({message: 'failed'})
        }
    })

    resp.status(200).json({message: 'success'})
  }

  async get_film_by_id(req, resp){
    const body = req.query,
          film = await FilmModel.findOne({_id: body._id}, (error) => {
            if(error){
              return resp.status(400).json({message: 'failed'})
            }
          })

    resp.status(201).json(film)
  }

  async get_film_list(req, resp){
    const body = req.query

    let query = {}

    if(body.actorName) query = {stars: { $regex: body.actorName, $options: 'i' }}
    if(body.filmTitle) query = {title: { $regex: body.filmTitle, $options: 'i' }}

    const filmsList = await FilmModel.find(query, {release_year: 1, title: 1})

    resp.status(201).json(filmsList)
  }
}

module.exports = new SiteController();
