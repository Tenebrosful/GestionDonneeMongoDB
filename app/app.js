const express = require('express');
const app=express();
const port=process.env.LOCAL_PORT;

const db = require('./DBConnection');

<<<<<<< HEAD
const retrieveParkings = require("./retrieveData").retrieveParkings;
=======
const {retrieveParkings} = require("./retrieveData");
>>>>>>> 312fbcea6e324f3ea1b93e8cfd9a9845fc05dccb

app.get('/', (req, res)=>{
    res.status(200).send('HelloWorld!');
});

app.post('/retrieveParkings', async function(req, res){
    await retrieveParkings();
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

<<<<<<< HEAD
//setInterval(retrieveData, 300000);
=======
setInterval(retrieveParkings, 300000);
>>>>>>> 312fbcea6e324f3ea1b93e8cfd9a9845fc05dccb

app.listen(port);