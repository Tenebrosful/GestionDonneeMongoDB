const { Db } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const url="mongodb://database";
const dbName="firstmongodb";

/**
 * @return {Db}
 */
function getConnection() {
    MongoClient.connect(url, function(err, client){
    if(err)
        console.error(err);
    else
        console.log('database connected');
        return client.db(dbName);
    });
}

module.exports= {getConnection};