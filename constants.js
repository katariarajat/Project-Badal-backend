exports.errorName= {
    UNAUTHORIZED : 'UNAUTHORIZED',
    USER_ALREADY_EXISTS : 'USER_ALREADY_EXISTS',
    USER_DO_NOT_EXISTS : 'USER_DO_NOT_EXISTS'
}

exports.errorType={
    UNAUTHORIZED : {
        message : 'LOGIN TO ACCESS DATA',
        statusCode : 401
    },
    USER_ALREADY_EXISTS : {
        message : 'USER ALREADY EXISTS',
        statusCode : 402
    },
    USER_DO_NOT_EXISTS : {
        message : 'USER DOES NOT EXISTS, ID/PASSWORD INCORRECT',
        statusCode : 403
    }
}