const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const graphQlSchema = require('./graphql/schema/schema');
const graphQlResolvers = require('./graphql/resolver/index');
const Core = require('./models/core');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
// const {createProject, getProjectGitlab} = require('./gitlab/index');
// Mongodb connecting 

async function Initialize() {
    // createProject();
    // getProjectGitlab();
    try {
        const existingOrganisation = await Core.findOne({ email: "IIIT-H" });
        let result = existingOrganisation;
        if (existingOrganisation) {
            console.log('Organisation exists already.');
        }
        else {
            const organisation = new Core({
                email: "iiith@iiit.ac.in",
                name: "IIIT-H",
                address: "IIIT-Hyderabad",
                pincode: "500032",
                contact: "",
                size: "1",
                company_description: "",
                urlWebsite: "https://iiit.ac.in",
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
                deleted_at: null,
            });
            result = await organisation.save();
        }
        const hashedPassword = await bcrypt.hash("ADMIN", 12);
        const isuser = await User.findOne({ email: "admin@iiit.ac.in" });
        // console.log(isuser); 
        if (!isuser) {
            const user = new User({
                email: "admin@iiit.ac.in",
                password: hashedPassword,
                name: "Admin",
                contact: "",
                address: "IIIT Hyderabad",
                pincode: "500032",
                type: "CORE",
                created_at: new Date().toString(),
                isAdmin: "YES",
                coreId: result.id,
                iscore: "YES",
            });
            const resultuser = await user.save();

        }
        else {
            console.log("Admin user already exist created");
        }
    } catch (err) {
        throw err;
    }
}


mongoose.connect(
    'mongodb://127.0.0.1:27017/' + process.env.MONGO_DB, { useNewUrlParser: true }
).then(() => {
    app.listen(3000, () => {
        console.log("Mongodb connected");
        console.log("Server started");
        Initialize();
    });
})
    .catch(err => {
        console.log("MONGO ERR", err);
    })




// ----------
const app = express();
app.use(bodyParser.json());

// auth check
app.use(isAuth);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// -------------
// Find error
const { errorType, errorName } = require('./constants');
const getErrorCode = errorName => {
    // console.log(errorName);
    // console.log(errorType[errorName]);
    return errorType[errorName];
}
// -------------


// graphql connected
app.use('/graphql', graphqlHttp((req, res, graphQLParams) => {
    return {
        schema: graphQlSchema,
        context: {
            userId: req.userId,
            isAuth: req.isAuth,
            userType: req.userType,
            orgId: req.orgId,
            isAdmin: req.isAdmin
        },
        rootValue: graphQlResolvers,
        graphiql: true,
        formatError: (err) => {
            const error = getErrorCode(err.message);
            if (error) {
                return ({ message: error.message, statusCode: error.statusCode });
            }
            else {
                return err;
            }
        }
    }
})
);