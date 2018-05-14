// Get a directory listing via SFTP
// https://github.com/mscdex/ssh2
// https://github.com/jyu213/ssh2-sftp-client
const Client = require('ssh2-sftp-client');
const sftp = new Client();
const config = require('../config.js');

/*
注意：实现建好3个目录
1、baseinfocompany
2、baseinfovehicle
3、baseinfodriver
*/
const sftptosrv = (collectionname,localdir,localfilename,callback)=>{
  console.log(`开始连接:${JSON.stringify(config.srvsftp)}`);
  sftp.connect(config.srvsftp).then(() => {
      console.log(`上传文件到tmp目录:${localdir}/${localfilename}`);
      sftp.put(`${localdir}/${localfilename}`, `${collectionname}/${localfilename}`);
      // return sftp.list('/pathname');
  }).then(() => {
    console.log(`完成!!`);
    callback(null,`${config.srvsftp.username}/${collectionname}/${localfilename}`);
  })
  .catch((err) => {
      console.log(`get error===>`);
      console.log(err);
      callback(err,null);
  });
};

module.exports = sftptosrv;
// sftptosrv('/Users/wangxiaoqing/Documents','70DBAC95C9C64C15863E66FD9A5A36D9.jpg',(err,result)=>{
//
// });

// example output:
// Client :: ready
// [ { filename: 'test.txt',
//     longname: '-rw-r--r--    1 frylock   frylock         12 Nov 18 11:05 test.txt',
//     attrs:
//      { size: 12,
//        uid: 1000,
//        gid: 1000,
//        mode: 33188,
//        atime: 1353254750,
//        mtime: 1353254744 } },
//   { filename: 'mydir',
//     longname: 'drwxr-xr-x    2 frylock   frylock       4096 Nov 18 15:03 mydir',
//     attrs:
//      { size: 1048576,
//        uid: 1000,
//        gid: 1000,
//        mode: 16877,
//        atime: 1353269007,
//        mtime: 1353269007 } } ]
