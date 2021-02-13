const Router = require('express').Router,
      SiteController = require('../controller/site.js')

const router = Router()

router.route('/film')
  .get((req, resp) => {
    SiteController.get_film_by_id(req, resp)
  })
  .post((req, resp) => {
    SiteController.add_films(req, resp)
  })
  .delete((req, resp) => {
    SiteController.delete_film(req, resp)
  })

router.route('/film/list')
  .get((req, resp) => {
    SiteController.get_film_list(req, resp)
  })

module.exports = router
