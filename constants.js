exports.errorName= {
    UNAUTHORIZED : 'UNAUTHORIZED',
    USER_ALREADY_EXISTS : 'USER_ALREADY_EXISTS',
    USER_DO_NOT_EXISTS : 'USER_DO_NOT_EXISTS',
    IIIT_CORE_ACCESS_ONLY : 'IIIT_CORE_ACCESS_ONLY',
    GENERAL_ERROR : 'GENERAL_ERROR',
    MONGO_ACCESS_ERROR : 'MONGO_ACCESS_ERROR',
    ORG_ALREADY_EXISTS : 'ORG_ALREADY_EXISTS',
    ALREADY_EXIST : 'ALREADY_EXIST',
}

exports.errorType={
    ALREADY_EXIST : {
        message : '... ALREADY EXISTS',
        statusCode : 401
    },
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
    },
    IIIT_CORE_ACCESS_ONLY : {
        message : 'ONLY IIIT H CORE MEMBER CAN ACCESS THIS DATA',
        statusCode : 404
    },
    GENERAL_ERROR : {
        message : 'GENERAL ERROR',
        statusCode : 405
    },
    MONGO_ACCESS_ERROR : {
        message : 'DATABASE ACCESS ERROR',
        statusCode : 405
    },
    ORG_ALREADY_EXISTS : {
        message : 'ORGANISATION ALREADY EXIST',
        statusCode : 405
    }

}

exports.usertype = {
    NGO : "NGO",
    IIITH : "IIITH",
    COMP : "COMP"
}