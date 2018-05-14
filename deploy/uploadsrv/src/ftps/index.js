const FTPS = require('ftps');
//参考文档：https://github.com/Atinux/node-ftps
const config = require('../config.js');
const debug = require('debug')('uploadsrv:ftps');
const ftps = new FTPS({
  host: config.srvsftp.host, // required
  username: config.srvsftp.username, // Optional. Use empty username for anonymous access.
  password: config.srvsftp.password, // Required if username is not empty, except when requiresPassword: false
  protocol: 'ftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
  // protocol is added on beginning of host, ex : sftp://domain.com in this case
  port: config.srvsftp.port, // Optional
  // port is added to the end of the host, ex: sftp://domain.com:22 in this case
  escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
  retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
  timeout: 10, // Optional, Time before failing a connection attempt. Defaults to 10
  retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
  retryMultiplier: 1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
  requiresPassword: true, // Optional, defaults to true
  autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
  cwd: '', // Optional, defaults to the directory from where the script is executed
  additionalLftpCommands: '', // Additional commands to pass to lftp, splitted by ';'
});
// Do some amazing things
debug(`--start connect:${JSON.stringify(config.srvsftp)}`);
const sftptosrv = (collectionname,localdir,localfilename,callback)=>{
  debug(`开始连接:${JSON.stringify(config.srvsftp)}`);
  if(!localfilename){
    debug(`无文件可用`);
    callback();
    return;
  }
  ftps.cd(`${collectionname}/`).addFile(`${localdir}/${localfilename}`).exec((err, res)=> {
    debug(`${collectionname}/上传文件到tmp目录:${localdir}/${localfilename},err:${!!err}`);
    if(!!err){
      debug(err);
      callback(err,res);
      return;
    }

    debug(`===>${config.srvsftp.username}/${collectionname}/${localfilename}`);
    callback(null,`/${config.srvsftp.username}/${collectionname}/${localfilename}`);
    // ftps.mv(`tmp/${localfilename}`, `swapfiles/${localfilename}`).exec((err, res)=> {
    //   debug(`移动文件到swapfiles目录:${localfilename}`);
    //   if(!err){
    //     debug(err);
    //   }
    //   callback(err,res);
    // });
  });
}

module.exports = sftptosrv;
