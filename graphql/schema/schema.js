const { buildSchema } = require('graphql');

/*
    Type of organisation 
    NGO,IIITH,COMP
*/
var schema = buildSchema(`

type Organisation{
    _id:ID
    name: String
    address: String
    phoneNumber : String
    pincode: String
    size: String    
    company_description: String
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
    tags : [String]
}

input OrganisationInput{
    name: String!
    email : String!
    address: String
    pincode: String
    phoneNumber: String
    size: String    
    company_description: String
    urlWebsite : String
    tags : [String]
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
    skills : [String]
    ui_screen : [String]
    api_build : [String]
    db_tables: [String]
    commit_id : String
    repo : String
    tags : [String]
}

input ModuleInput{
    projectId: String!
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
    tags : [String]
}

type User {
    _id:ID
    email: String!
    password: String!
    name: String!
    username: String
    address: String
    pincode: String
    type: String
    ngoId : String
    orgId : String
    coreId : String
    created_at: String 
    updated_at: String
    deleted_at: String
    isAdmin : String
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

type Project{
    _id : ID
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
    tags : [String]
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
}

type Team{
    name: String
    participants : [String]
    taskMeta : [String]
}

type returnTeam{
    name: String
    participants : [String]
    taskMeta : [String]
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
}

type UserOrg {
    _id:ID
    email: String!
    password: String!
    name: String!
    username: String
    address: String
    pincode: String
    type: String
    ngoId : String
    orgId : String
    coreId : String
    created_at: String 
    updated_at: String
    deleted_at: String
    isAdmin : String
}

type RootQuery {
    GetAllOrganisations : [Organisation]
    GetCompany : [Organisation]
    GetNgo : [Organisation]
    
    login(email: String!, password: String!) : AuthData
    
    GetAllProjects : [Project!]!
    MyProjects : [Project]!

    ShowAllTeams : [returnTeam!]!
    GetModuleForProjectById(projectId: String!) : [Module]!

    ShowTeamsForCompany : [returnTeam!]!
    GetTaskForModuleById(moduleId: String!) : [Task!]!
    GetProjectsForCompanies(companiesId : String!) : [Project]
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

module.exports = schema