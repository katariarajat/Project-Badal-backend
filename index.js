const express = require('express');
const bodyParser = require('body-parser');
const  graphqlHttp  = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const graphQlSchema = require('./graphql/schema/schema');
const graphQlResolvers = require('./graphql/resolver/index');
const Organisation = require('./models/organisation');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
// Mongodb connecting 

async function Initialize(){

    try {
        const existingOrganisation = await Organisation.findOne({email: "IIIT-H"});
        let result=existingOrganisation;
        if (existingOrganisation) {
            console.log('Organisation exists already.');
        }
        else 
        {
            const organisation = new Organisation({
                email: "IIIT-H",
                name: "IIIT-H",
                address: "IIIT-Hyderabad",
                pincode: "500032",
                contact: "",
                size: "",    
                company_description: "",
                urlWebsite : "https://iiit.ac.in",
                created_at: new Date().toString(),      
                updated_at: new Date().toString(),
                deleted_at: null,
                type: "IIITH",
            });
            
            result = await organisation.save();
        }    
        const hashedPassword = await bcrypt.hash("ADMIN", 12);
        const isuser = await User.findOne({email : "ADMIN"});
        // console.log(isuser); 
        if(!isuser)
        {
            const user = new User({
                email: "ADMIN",
                password: hashedPassword,
                name: "Admin",
                contact: "",
                address: "IIIT Hyderabad",
                pincode: "500032",
                type: "IIIT",
                created_at: new Date().toString(),
                organisationId: result.id,
                iscore: "YES",
            });
            const resultuser = await user.save();
            
        }
        else 
        {
            console.log("Admin user already exist created");
        }
            


    }catch (err) {
        throw err;
      }



    
}


mongoose.connect(
    'mongodb://127.0.0.1:27017/' + process.env.MONGO_DB, { useNewUrlParser: true }
).then(()=>{
    app.listen(3000,() => {
        console.log("Mongodb connected");
        console.log("Server started");
        Initialize();
    }); 
})
.catch(err => {
    console.log("MONGO ERR",err);
})



// ----------
const app = express();
app.use(bodyParser.json());

// auth check
app.use(isAuth);

// graphql connected
app.use('/graphql',graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
    })
);

