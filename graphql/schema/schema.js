const { buildSchema } = require('graphql');

var schema = buildSchema(`

type Organisation{
    _id:ID
    name: String!
    address: String!
    pincode: Number!
    contact: String!
    size: String!    
    company_description: String!
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
}

type Project{
    name : String!
    brief : String!
    problem_statement : String!
    fileUrl : String
    domain : String
    created_at : String!
    updated_at : String
    deleted_at : String
    organisation : String!
}

type User {
    _id:ID
    email: String!
    password: String
    name: String!
    contact:String
    regerenceId: String
    address: String
    pincode: String
    type:USERCHARTYPE
    password: String!
    created_at: String 
    updated_at: String
    deleted_at: String
    organisationId: String
}

type projects{

}

input UserInput{
    email: String!
    password: String
    name: String!
    contact:String
    regerenceId: String
    address: String
    pincode: String
    type:USERCHARTYPE
    password: String!
    created_at: String 
    updated_at: String
    deleted_at: String
    organisationId: String
}

input OrganisationInput{
    name: String!
    address: String!
    pincode: Number!
    contact: String!
    size: String!    
    company_description: String!
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

enum USERCHARTYPE {
    IIIT
    NGO
    ORG
}

type RootQuery {
    organisations : [Organisation!]
    login(email: String!, password: String!) : AuthData!
}

type RootMutation {
    createUser(userinput: UserInput): User!
    createOrganisation(organisationinput: OrganisationInput): Organisation!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)

module.exports = schema