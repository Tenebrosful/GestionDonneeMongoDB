const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://database";
const dbName = process.env.MONGO_INITDB_DATABASE;//"firstmongodb";

const db = new MongoClient(url + "/" + dbName, {useUnifiedTopology: true});
db.connect();

/**
 *
 * @type {Db}
 */
module.exports = db;