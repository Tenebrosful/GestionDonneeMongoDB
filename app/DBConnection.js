const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://database";
const dbName = process.env.MONGO_INITDB_DATABASE;//"firstmongodb";

const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
mongoClient.connect();
const db = mongoClient.db(dbName);

/**
 *
 * @type {Db}
 */
module.exports = db;