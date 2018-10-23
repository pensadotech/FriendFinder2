// -------------------------------------------
// Program: htmlRoutes.js
// Purpose: program that concentrates server
//          routes for HTML navigation
// -------------------------------------------

// Modules
const path = require('path')

module.exports = function (app) {

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
  })

  app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'))
  })

}