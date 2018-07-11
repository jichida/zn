const config = {
  CompanyId:'3411ZNCX293T',
  logdir:process.env.logdir||'/app/zn/logs',
  uploaddir:process.env.uploaddir,
  localdir:process.env.localdir || `/app/zn/deploy/dist/uploader`,
  localfilename:process.env.localfilename || `fc1f8e88-f3a5-4a04-817b-1a61b5f77ed2.jpeg`,
  remotedir:process.env.remotedir || `/home/wycftp1079/baseinfodriver`,
  remotefilename:process.env.remotefilename || `test.jpeg`,
  platformserverurl:process.env.platformserverurl||'http://172.16.5.101:8080',//'http://127.0.0.1:8080',
  srvsftp:{
      host: process.env.srvsftp_host||'vpn.i2u.top',
      port: process.env.srvsftp_port||'22',
      username: process.env.srvsftp_username||'wycftp1079',
      password: process.env.srvsftp_password||'@N5755OR8c7!'
  },
  srvredis:{
    host:process.env.srvredis_host||'127.0.0.1',
    port: process.env.srvredis_port||6379,
    // user: process.env.srvredis_user||'wxq',
    // password: process.env.srvredis_password||'124',
    // db: process.env.srvredis_db||'zndb'
  }
};

module.exports = config;
