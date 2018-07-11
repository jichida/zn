const sftptosrv =  require('./src/ftps/index.js');
const config = require('./src/config');

sftptosrv(config.localdir,config.localfilename,config.remotedir,config.remotefilename,(err,result)=>{
  console.log(err);
  console.log(result);
});

/*
lftp sftp://wycftp1079@vpn.i2u.top
@N5755OR8c7!
cd /home/wycftp1079/
put /app/zn/deploy/dist/uploader/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg
mv /home/wycftp1079/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg /home/wycftp1079/test.jpeg


put -O /home/wycftp1079/baseinfocompany /app/zn/deploy/dist/uploader/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg
put /app/zn/deploy/dist/uploader/fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg
*/
