const { json } = require('express');
const express=require('express');
const app=express();
const port=process.env.LOCAL_PORT;

const MongoClient = require('mongodb').MongoClient;
const url="mongodb://database";
const dbName="firstmongodb";

let db;
MongoClient.connect(url, function(err, client){
    if(err)
        console.error(err);
    db=client.db(dbName);
});

app.get('/', (req, res)=>{
    res.status(200).json(null);
});
app.get('/test', (req, res)=>{
    res.status(200).json(null);
});

app.listen(port);