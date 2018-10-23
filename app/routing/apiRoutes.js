// -------------------------------------------
// Program: apiRoutes.js
// Purpose: program that concetrate Server API routes
//          to save and retreive data
// -------------------------------------------

// Modules 
let friends = require('../data/friends.js')

module.exports = function (app) {

  app.get('/questions', (req, res) => {
    res.json(friends.getQuestionsList())
  })

  app.post('/addFriends', (req, res) => {
    friends.addFriend(req.body);
    res.sendStatus(200)
  })

  app.get('/getCompatibleFriend', (req, res) => {
    let cfriend = friends.getCompatibleFriend(req.query.name);
    console.log(`cfriend.name: ${cfriend.friend.name} photo: ${cfriend.friend.photo} points: ${cfriend.points}`)
    res.json(cfriend);
  })

}
