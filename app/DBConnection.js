const MongoClient = require('mongodb').MongoClient;
const url="mongodb://database";
const dbName=process.env.MONGO_INITDB_DATABASE;//"firstmongodb";

/**
 * @return {Db}
 */
function getDatabase() {
    let db;
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    if(err)
        console.error(err);
    else
        console.log('database connected');
        db = client.db(dbName);
    });
    return db;
}

module.exports= { db: getDatabase() };