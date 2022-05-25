// const Minio = require('minio')

// var client = new Minio.Client({
//     endPoint: 'canvas.iiit.ac.in',
//     // useSSL: true,
//     accessKey: process.env.MINIO_ACCESS_KEY,
//     secretKey: process.env.MINIO_SECRET_KEY
// });


// module.exports = {
//     GetPresignedUrl : async (args,req) => {
//         client.presignedPutObject('project-badal', args.name, (err, url) => {
//             if (err) throw err
//             return url;
//         });
//     }
// }



const { storeFile } = require('../../index');
//...
module.exports = {
    uploadFile: async (_, { file }) => {
        const fileId = await storeFile(file).then(result => result);
        
        return true;
      }
}
