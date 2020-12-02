const MongoClient = require('mongodb').MongoClient;
const url="mongodb://database";
const dbName="firstmongodb";

let db;
MongoClient.connect(url, function(err, client){
    if(err)
        console.error(err);
    db=client.db(dbName);
});