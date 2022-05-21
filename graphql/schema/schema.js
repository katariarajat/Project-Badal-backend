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
    password : String
    address: String
    phoneNumber : String
    size: String
    teamSize : String    
    company_description: String
    urlWebsite : String
    created_at: String      
    updated_at: String
    deleted_at: String
    NumberOfOnGoingProjects : String
    NumberOfcompletedProjects : String
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
    noOfModules : String
    progress : String
    gitlabProjectId : String
    ssh_url_to_repo : String
    http_url_to_repo : String
    web_url : String
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
    ngoId : String
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
    assigned_to: Team
    skills : [Skill]
    ui_screen : String
    api_build : String
    db_tables : String
    commit_id : String
    repo : String
    noOfOngoingTasks : String
    noOfTasks : String
    noOfCompletedTasks : String
    requirements : String
}

input ModuleInput{
    projectId: String!
    name : String
    description: String
    status: String
    start_date:String
    end_date: String
    skills : [String]
    ui_screen : String
    api_build : String
    db_tables : String
    commit_id : String
    repo : String
    requirements : String
}

type User {
    _id:ID
    email: String!
    name: String!
    password : String
    phoneNumber : String
    address: String
    type: String
    ngoId : Organisation
    orgId : Organisation
    coreId : Organisation
    isAdmin : String
    created_at: String 
    updated_at: String
    deleted_at: String
    skill : [Skill]
}

type UserWithoutPassword {
    _id:ID
    email: String!
    name: String!
    phoneNumber : String
    address: String
    type: String
    ngoId : Organisation
    orgId : Organisation
    coreId : Organisation
    isAdmin : String
    created_at: String 
    updated_at: String
    deleted_at: String
    skill : [Skill]
}


input UserInput{
    email: String!
    name: String!
    phoneNumber : String
    address: String
    isAdmin : String!
    skill : [String]
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
    _id : ID!
    name: String
    participants : [UserWithoutPassword]
    skill : [Skill]
    orgId : Organisation
}

input TeamInput{
    name: String
    participants : [String]
    skill : [String]
    orgId : String
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
    assigned_to : UserWithoutPassword
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
    teamId : String
    userRole : String
}

type Skill{
    _id : ID!
    skill : String
}

type RootQuery {
    
    login(email: String!, password: String!) : AuthData
    GetUserData : UserWithoutPassword!

    GetCompany : [Organisation]
    GetNgo : [Organisation]
    
    GetEmployeeForCompany(orgId : String!) : [UserWithoutPassword]

    GetAllProjects : [Project!]
    MyProjects : [Project]
    GetProjectForNgoByNgoId(ngoId: String!) : [Project]

    GetAllTeams : [Team!]!
    GetTeamsForCompany(orgId : String!) : [Team]!
    GetTeamDetail(teamId : String!) : Team

    GetModuleForProjectById(projectId: String!) : [Module]!
    GetProjectsForCompanies(companiesId : String!) : [Project]

    GetTaskForModuleById(moduleId: String!) : [Task!]!
    
    GetSkills : [Skill]!
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
    AssignTaskToUser(UserId : String!,taskId : String) : Task

    createTeam(teaminput : TeamInput) : Team!
    AddUserToTeam(userIds : [String], teamId : String) : Team!
    AssignModuleToTeam(teamId: String!, moduleId: String!) : ModuleTeam!

    UpdateStatusOfTask(TaskId: String!,status : String!) : Task!

    AddEmployeeToCompany(employeeId: String!,companyId: String!) : UserWithoutPassword!
    RemoveEmployeeFromCompany(employeeId: String!) : UserWithoutPassword!

    GlobalSkillAdd(skills : [String!]!) : [Skill]
    GlobalSkillRemove(skills : [String!]!) : [Skill]
}

type ModuleTeam {
    _id : ID!
    moduleId : Module
    teamId : Team
    projectId : String
    orgId : String
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