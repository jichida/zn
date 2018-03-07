const sftptosrv =  require('./src/ftps/index.js');

const localdir = `/app/zn/deploy/dist/uploader`;
const localfilename = `fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg`;

console.log(`start....`);
sftptosrv(localdir,localfilename,(err,result)=>{
  console.log(`sftptosrv--->callback`);
  console.log(err);
  console.log(result);
});
