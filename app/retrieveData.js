let db = require('./DBConnection').db;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function sendXhrPromise(url){
    return new Promise((resolve, reject)=>{
        let xhr=new XMLHttpRequest();
    
        xhr.responseType='json';
        xhr.open('GET', url);
        
        xhr.addEventListener('load', function(response){
            console.log(response);
            if(xhr.readyState===xhr.DONE)
                resolve(response);
            else
                reject(response);
        });
        xhr.addEventListener('error', function(response){
            reject(response);
        });
        xhr.send();
    });
}

function updateParkings(data){
    let parkings = data.features;
    console.log("updateParkings STARTED");
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

        db.collection('ptsInteret').insertOne(myParking, (err, res)=>{
            if (err) throw err;
            console.log("1 parking inserted");
        });
    });
}

function retrieveParkings(){
    let urlParking="http://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";

    sendXhrPromise(urlParking).then(updateParkings).catch((error)=>{console.error(error)});
}

module.exports = { retrieveParkings };