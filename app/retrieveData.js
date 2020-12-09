let db = require('./DBConnection');

function sendXhrPromise(url){
    return new Promise((resolve, reject)=>{
        let xhr=new XMLHttpRequest();
    
        xhr.responseType='json';
        xhr.open('GET', url);
        
        xhr.addEventListener('load', function(response){
            if(xhr.readyState===xhr.DONE)
                resolve(response.target.response);
            else
                reject(response);
        });
        xhr.addEventListener('error', function(response){
            reject(response);
        });
        xhr.send();
    });
}

function retrieveParkings(data){
    let parkings = data.features;

    parkings.forEach(parking => {
        db.collection('ptsInteret').insertOne();
    });
}

function retrieveData(){
    let urlParking="https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";

    sendXhrPromise(urlParking).then(retrieveParkings).catch((error)=>{console.error(error)});
}

module.exports = retrieveData;