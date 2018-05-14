const Client = require('ssh2-sftp-client');
const sftp = new Client();
const config = require('../config.js');

const ftpinit = (callback)=>{
  /*
  注意：实现建好3个目录
  1、baseinfocompany
  2、baseinfovehicle
  3、baseinfodriver
  */
  const newdirlist = ['baseinfocompany','baseinfovehicle','baseinfodriver'];

  console.log(`开始连接:${JSON.stringify(config.srvsftp)}`);
  sftp.connect(config.srvsftp).then(() => {
      console.log(`上传文件到tmp目录:${localdir}/${localfilename}`);
      for(let i = 0 ;i < newdirlist.length; i++){
        sftp.mkdir(newdirlist[i], true);
      }
  }).then(() => {
    console.log(`完成!!`);
    callback(null,true);
  })
  .catch((err) => {
      console.log(`get error===>`);
      console.log(err);
      callback(err,null);
  });
};

module.exports = ftpinit;
