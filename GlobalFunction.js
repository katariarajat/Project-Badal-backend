const ModuleTeam = require('./models/moduleTeam');


module.exports = {
    makePassword(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    },
    async returnModuleTeam(moduleTeamId){
      const moduleTeam = await ModuleTeam.findOne({_id : moduleTeamId}).populate('moduleId').populate('teamId');
      return {
        ...moduleTeam._doc,
        _id : moduleTeam._id
      }
    }
}