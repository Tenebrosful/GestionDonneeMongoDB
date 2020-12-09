const express = require('express');
const app=express();
const port=process.env.LOCAL_PORT;

const db = require('./DBConnection');

const {retrieveData} = require("retrieveData");

app.get('/', (req, res)=>{
    res.status(200).send('HelloWorld!');
});

app.post('/retrieveParkings', function(req, res){
    require('./retrieveData.js').retrieveParkings();
    res.status(200).send("Data retrieved!");
});

/**
 * Erreur 400
 */
app.use(function (req, res) {
    res.status(400).json({type: "error", error: 400, message: `URL ${req.url} inconnue`});
});

/**
 * Erreur 500
 */
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({
        type: "error",
        error: 500,
        message: (process.env.NODE_ENV === "dev" ? err : "Erreur Serveur")
    });
});

setInterval(retrieveData, 300000);

app.listen(port);