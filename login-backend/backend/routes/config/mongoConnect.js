var MongoClient = require('mongodb');

var db = null; // global variable to hold the connection

MongoClient.connect('mongodb://localhost:27017/', function(err, client) {
    if(err) { console.error(err) }

    db = client.db('Users');
    // console.log(db)
    // once connected, assign the connection to the global variable
});
module.exports = db;

