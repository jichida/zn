const FTPS = require('ftps');
const config = require('../config.js');

var ftps = new FTPS({
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
console.log(`--start connect:${JSON.stringify(config.srvsftp)}`);
const sftptosrv = (localdir,localfilename,callback)=>{
  console.log(`--file:${localdir}/${localfilename}`);
  ftps.cd('/tmp').addFile(`${localdir}/${localfilename}`).exec(callback);
}

module.exports = sftptosrv;
