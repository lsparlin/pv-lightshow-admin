const MongoClient = require('mongodb').MongoClient

 var mongodb_url = 'mongodb://127.0.0.1:27017/pv_lightshow'
//var mongodb_url = 'mongodb://heroku_mk1n44q1:pqhodgofeeu7a0n74vsm2hksq@ds147274.mlab.com:47274/heroku_mk1n44q1'
const SETTINGS_COLLECTION_NAME = 'site_settings'

MongoClient.connect(mongodb_url, (err, database) => {
  if (err) return console.log(err)

  const db = database

  var settingsObject = {
    '_id': '1',
    introductoryText: 'You can click the "Keep Awake" button to prevent the screen from dimming during the show',
    conclusionUrl: 'https://libertylightshow.org'
  }

  db.collection(SETTINGS_COLLECTION_NAME).save(settingsObject)

  return
})

