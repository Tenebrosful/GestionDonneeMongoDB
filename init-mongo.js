db.createUser (
    {
        user : "vgardel",
        pwd : "vgardel",
        roles : [
            {
                role : "readWrite",
                db : "firstmongodb"
            }
        ]
    }
)