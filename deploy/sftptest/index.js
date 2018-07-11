const sftptosrv =  require('./src/ftps/index.js');

const localdir = `/app/zn/deploy/dist/uploader`;
const localfilename = `fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg`;

const remotefilename = `test.jpeg`;
const collectionname = `baseinfodriver`;
sftptosrv(localdir,localfilename,collectionname,remotefilename,(err,result)=>{
  console.log(err);
  console.log(result);
});

/*
lftp sftp://wycftp1079@vpn.i2u.top
@N5755OR8c7!
put -O /home/wycftp1079/baseinfocompany /app/zn/deploy/dist/uploader/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg
put /app/zn/deploy/dist/uploader/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg
*/
