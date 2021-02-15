const FilmModel = require('../models/film.js')

class SiteController{
  async add_films(req, resp){
    const body = req.body

    let errorData = {
      status: false,
      data: {}
    }

    await FilmModel.insertMany(body, (error) => {
       if(error){
         errorData = {
           flag: true,
           data: error
         }
       }
    })

    if(errorData.flag) return resp.status(400).json(errorData.data)

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
    let query = body.name
      ? {$or: [
          {title: { $regex: body.name, $options: 'i' }},
           {stars: { $regex: body.name, $options: 'i' }}
        ]}
      : {}

    const filmsList = await FilmModel.find(query, {release_year: 1, title: 1})

    resp.status(201).json(filmsList)
  }
}

module.exports = new SiteController();
