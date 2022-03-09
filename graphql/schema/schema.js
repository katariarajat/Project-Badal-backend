const { buildSchema } = require('graphql');

var schema = buildSchema(`

type Organisation{
    _id:ID
    name: String
    address: String
    pincode: String
    contact: String
    size: String    
    company_description: String
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
    type: ORGTYPE!
}

input OrganisationInput{
    name: String
    address: String
    pincode: String
    contact: String
    size: String    
    company_description: String
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
    type: ORGTYPE!
}

type Module{
    _id: ID
    projectId: String!
    description: String
    status: String
    start_date:String
    end_date: String
    created_at: String
    updated_at:String
    deleted_at: String
    assigned_to: String
}

type User {
    _id:ID
    email: String!
    password: String
    name: String
    contact:String
    address: String
    pincode: String
    type:USERCHARTYPE
    created_at: String 
    updated_at: String
    deleted_at: String
    organisationId: String
    iscore : String
}

input UserInput{
    email: String!
    password: String
    name: String
    contact:String
    address: String
    pincode: String
    type:USERCHARTYPE
    created_at: String 
    updated_at: String
    deleted_at: String
    organisationId: String
    iscore : String
}

type Project{
    _id : ID
    name:String
    brief:String
    problem_statement:String
    fileUrl:String
    domain:String
    created_at:String
    updated_at : String
    deleted_at : String
    NGOId : String
    status: String
}

input ProjectInput{
    name:String
    brief:String
    problem_statement:String
    fileUrl:String
    domain:String
    created_at:String
    updated_at : String
    deleted_at : String
    NGOId : String
    status: String
}

input ModuleInput{
    projectId: String!
    description: String
    status: String
    start_date:String
    end_date: String
    created_at: String
    updated_at:String
    deleted_at: String
    assigned_to: String
}

type Team{
    name: String
    ModuleId:[String]
    participants : [String]
    taskMeta : [String]
    organisationId : String
}

type TeamInput{
    name: String
    ModuleId:[String]
    participants : [String]
    taskMeta : [String]
    organisationId : String
}

type Feature{
    name: String
    meta: String
    brief: String
    status: String
    created_at: String
    updated_at: String
    assigned_at: String
    component: String
    startDate: String
    endDate: String
    assigned_to : String
    modules: String
}

type Solution{
    module_id:[String],
    feature_id:[String],
    projectId:[String],
    organisation: String
    created_at: String
    updated_at: String
    Teams:[String]
}

type Task{
    _id:ID
    name: String
    brief: String
    assigned_to: String
    ModuleId:String
    created_at: String
    updated_at: String
    participantsId:[String]
    status: String
}

input TaskInput{
    name: String
    brief: String
    assigned_to: String
    ModuleId:String
    created_at: String
    updated_at: String
    participantsId:[String]
    status: String

}
type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

enum USERCHARTYPE {
    IIITH
    NGO
    COMP
}

enum ORGTYPE {
    ADMIN
    NGO
    COMP
}

type RootQuery {
    organisations : [Organisation!]
    login(email: String!, password: String!) : AuthData
    ShowTeams : [Team!]!
    GetAllProjects : [Project!]!
    MyProjects(NGOId : String!) : [Project]!
    GetModuleForProjectById(projectId: String!) : [Module]!
    UpdateStatusOfTask(TaskId: String!,status : String!) : Task!
    GetNgo : [Organisation!]!
    GetCompany : [Organisation!]!  
}

type RootMutation {
    createUser(userinput: UserInput): User!
    createOrganisation(organisationinput: OrganisationInput): Organisation!
    CreateProject(projectinput: ProjectInput) : Project!
    UpdateStatusOfProject(projectId: String!, status: String!): Project!
    AddModuleToProjectById(moduleInput : ModuleInput) : Module
    UpdateModuleStatus(status: String!,moduleId: String!) : Module!
    AddTaskToModuleById(taskInput: TaskInput) : Task!
    GetTaskForModuleById(moduleId: String!) : [Task!]!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)

module.exports = schema