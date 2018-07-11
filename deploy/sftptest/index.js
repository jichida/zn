const sftptosrv =  require('./src/ftps/index.js');

const localdir = `/app/zn/deploy/dist/uploader`;
const localfilename = `fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg`;

const remotefilename = `test.jpeg`;
const collectionname = `wycftp1079`;
sftptosrv(uploaddir,newdoc.PhotoId,collectionname,remotefilename,(err,result)=>{
  console.log(err);
  console.log(result);
});
