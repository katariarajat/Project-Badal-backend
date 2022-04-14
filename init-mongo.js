db.createUser(
    {
        user : "Rajat",
        pwd  : "Rajat",
        roles: [
            {
                role : "readWrite",
                db   : "Badal"
            }
        ]    
    }
)