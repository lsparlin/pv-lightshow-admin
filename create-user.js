const MongoClient = require('mongodb').MongoClient
const Password = require('password-hash-and-salt')

// var mongodb_url = 'mongodb://127.0.0.1:27017/pv_lightshow'
var mongodb_url = 'mongodb://heroku_mk1n44q1:pqhodgofeeu7a0n74vsm2hksq@ds147274.mlab.com:47274/heroku_mk1n44q1'
const USER_COLLECTION_NAME = 'users'

MongoClient.connect(mongodb_url, (err, database) => {
  if (err) return console.log(err)

  const db = database

  var user = { 'username': 'lewis' }
  Password('lewismsparlin').hash((err, hash) => {
    user.hash = hash

    db.collection(USER_COLLECTION_NAME).save(user)
  })

})

