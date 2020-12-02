const express = require('express');
const app=express();
const port=process.env.LOCAL_PORT;

let db = require('./DBConnection').getConnection();



app.get('/', (req, res)=>{
    res.status(200).send('HelloWorld!');

app.listen(port);