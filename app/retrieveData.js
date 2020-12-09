let axios = require('axios');

let db = require('./DBConnection.js');

function updateParkings(data){
    console.log("updateParkings STARTED");
    let parkings = data.features;
    //console.log("parkings: "+parkings);
    parkings.forEach(parking => {
        let myParking={
            nom: parking.NOM,
            adresse: parking.ADRESS,
            categorie_id:"",
            caracteristique: {
                capacite: parking.CAPACITE,
                places: parking.PLACES
            },
            coordonnee: {
                x: parking.x,
                y: parking.y
            }
        };
        
        if(db.isConnected)
            console.log("db is indeed connected");
        else
            return;

        db.db(process.env.MONGO_INITDB_DATABASE).collection('ptsInteret').insertOne(myParking, (err, res)=>{
            if (err) throw err;
                console.log("1 parking inserted");
        });

    });
}

async function retrieveParkings(){
    let urlParking="https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";

    let response=await axios.get(urlParking);
    //console.dir(response);
    updateParkings(response.data);
}

module.exports = { retrieveParkings };