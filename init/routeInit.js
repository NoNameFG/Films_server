const site_router = require('../routes/site.js')

const route_init = (app, base_url) => {
  app.use(base_url, site_router)
}

module.exports = route_init
