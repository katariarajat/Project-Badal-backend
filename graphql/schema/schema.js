const { buildSchema } = require('graphql');

/*
    Type of organisation 
    NGO,IIITH,COMP
*/
var schema = buildSchema(`

type Organisation{
    _id:ID
    name: String!
    email: String!
    address: String
    phoneNumber : String
    size: String
    teamSize : String    
    company_description: String
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
    tags : [Tag]
}

input OrganisationInput{
    name: String!
    email : String!
    address: String
    phoneNumber: String
    company_description: String
    urlWebsite : String
    tags : [String]
}

type Tag{
    _id : ID
    skill : String
}

type Project{
    _id : ID!
    name : String
    description : String
    problem_statement:String
    fileUrl:String
    domain:String
    created_at:String
    updated_at : String
    deleted_at : String
    ngoId : String
    repoId : String
    status: String
    tags : [Tag]
}

input ProjectInput{
    name : String
    description : String
    problem_statement:String
    fileUrl:String
    domain:String
    repoId : String
    status: String
    tags : [String]
    ngoId : String!
}


type Module{
    _id: ID
    projectId: String
    name : String
    description: String
    status: String
    start_date:String
    end_date: String
    created_at: String
    updated_at:String
    deleted_at: String
    assigned_to: String
    skills : [Tag]
    ui_screen : [String]
    api_build : [String]
    db_tables: [String]
    commit_id : String
    repo : String
}

input ModuleInput{
    projectId: String!
    name : String
    description: String
    status: String
    start_date:String
    end_date: String
    skills : [String]
    ui_screen : [String]
    api_build : [String]
    db_tables: [String]
    commit_id : String
    repo : String
}

type User {
    _id:ID
    email: String!
    name: String!
    username: String
    address: String
    pincode: String
    type: String
    ngoId : Organisation
    orgId : Organisation
    coreId : Organisation
    isAdmin : String
    created_at: String 
    updated_at: String
    deleted_at: String
}

input UserInput{
    email: String!
    password: String!
    name: String!
    address: String
    pincode: String
    isAdmin : String!
}

input UserInputByCore{
    email: String!
    password: String!
    name: String!
    address: String
    pincode: String
    isAdmin : String!
    orgId : String!
    type : String!
}


type Team{
    name: String
    participants : [User]
    taskMeta : [Tag]
}

type returnTeam{
    name: String
    participants : [User]
    taskMeta : [Tag]
    organisation : Organisation
}

input TeamInput{
    name: String
    participants : [String]
    taskMeta : [String]
}

type Solution{
    moduleTeamAssign:[String],
    projectId:[String],
    organisation: String
    created_at: String
    updated_at: String
    Teams: String
}

type Task{
    _id:ID
    name : String
    description : String
    ModuleId : String
    created_at: String
    updated_at: String
    status: String
}

input TaskInput{
    name : String
    description : String
    ModuleId : String
    status: String
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Skill{
    _id : ID!
    skill : String
}

input SkillInput{
    skill : String!
    user : Int
    project : Int
    org : Int
}

type RootQuery {
    
    login(email: String!, password: String!) : AuthData

    
    GetCompany : [Organisation]
    GetNgo : [Organisation]
    
    GetAllProjects : [Project!]!
    MyProjects : [Project]!
    GetProjectForNgoByNgoId(ngoId: String!) : [Project]!

    ShowAllTeams : [returnTeam!]!
    ShowTeamsForCompany : [returnTeam!]!

    GetModuleForProjectById(projectId: String!) : [Module]!
    GetProjectsForCompanies(companiesId : String!) : [Project]

    GetTaskForModuleById(moduleId: String!) : [Task!]!
    
    GetSkillForUser : [Skill]!
    GetSkillForProject : [Skill]!
}


type RootMutation {
    createUser(userinput: UserInput): User
    createUserForOrgByCore(userinput:UserInputByCore ): User

    createOrganisation(organisationinput: OrganisationInput): Organisation!
    createNgo(organisationinput: OrganisationInput): Organisation!
    createCore(organisationinput: OrganisationInput): Organisation!

    createProject(projectinput: ProjectInput) : Project!
    AddModuleToProjectById(moduleInput : ModuleInput) : Module
    UpdateStatusOfProject(projectId: String!, status: String!): Project!

    UpdateModuleStatus(status: String!,moduleId: String!) : Module!
    AddTaskToModuleById(taskInput: TaskInput) : Task!

    createTeam(teaminput : TeamInput) : Team!
    AddUserToTeam(userIds : [String], teamId : String) : Team!
    AssignModuleToTeam(teamId: String!, moduleId: String!, projectId: String!) : ModuleTeam!

    UpdateStatusOfTask(TaskId: String!,status : String!) : Task!

    AddEmployeeToCompany(employeeId: String!,companyId: String!) : User!
    RemoveEmployeeFromCompany(employeeId: String!) : User!

    GlobalSkillAdd(skills : [SkillInput]) : [Skill]
}

type ModuleTeam {
    _id : ID!
    moduleId: [Module]
    Status : String
    projectId : Project
    orgId : Organisation
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`)



/**
 * REMOVED QUERIES[NO LONGER REQUIRED]
 * GetAllOrganisations : [Organisation]
 * 
 * REMOVED MUTATIONS[NO LONGER REQUIRED]
 * 
 */
module.exports = schema