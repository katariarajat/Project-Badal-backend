const express = require('express');
const bodyParser = require('body-parser');
const  graphqlHttp  = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
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

const app = express();

app.use(bodyParser.json());

const events = []   

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`

        type Event {
            _id: ID
            title:String!
            description:String!
            price:Float!
            date: String!
        }

        type User {
            _id:ID
            email: String!
            password: String
        }
        
        input UserInput {
            email: String!
            password: String!
        }

        input EventInput{
            title:String!
            description:String!
            price:Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find({title :'A test'}).then(result => {
                return result.map(result => {
                    return {...result._doc,_id: result._doc._id.toString()};
                });
            }).catch(err => {
                throw err;
            });
        },
        createUser: (args) => {
            User.findOne({email: args.userInput.email}).then(user => {
                if(user)
                {
                    throw new Error('User exists already!');
                }
                else 
                {
                    return bcrypt.hash(args.userInput.password,12).then(result => {
                        
                    });

                }
            });
            
            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password
            });
            user.save().then(result => {
                return result.map(result => {
                    
                })
            }).catch(err => {
                throw err;
            })
        },
        createEvent: (args)=>{
            const event = new Event({
                title: args.eventInput.title,
                description : args.eventInput.description,
                price:args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            
            return event.save().then(result => {
                console.log(result);
                return {...result._doc};
            }).catch(err => {
                console.log(err);
                throw err;
            });
        } 
    },
    graphiql: true

    })
);

