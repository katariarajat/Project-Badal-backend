const express = require('express');
const bodyParser = require('body-parser');
const  graphqlHttp  = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const schema = require('./graphql/schema');
const isAuth = require('./middleware/is-auth');
const graphQlSchema = require('./graphql/schema/schema');
const graphQlResolvers = require('./graphql/resolver/index');

// Mongodb connecting 

mongoose.connect(
    'mongodb://127.0.0.1:27017/' + process.env.MONGO_DB, { useNewUrlParser: true }
).then(()=>{
    app.listen(3000,() => {
        console.log("Mongodb connected");
        console.log("Server started");
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

