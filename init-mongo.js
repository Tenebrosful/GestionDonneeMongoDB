db.createUser (
    {
        user : "root",
        pwd : "root",
        roles : [
            {
                role : "readWrite",
                db : "firstmongodb"
            }
        ]
    }
)

db.createCollection("ptsInteret");
db.createCollection("typeInteret");

//require('./app/retrieveData.js').retrieveParkings();