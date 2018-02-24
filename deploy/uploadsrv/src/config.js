const config = {
  CompanyId:'zncx',
  logdir:process.env.logdir||'/app/zn/logs',
  uploaddir:process.env.uploaddir||'/app/zn/logs',
  platformserverurl:process.env.platformserverurl||'http://127.0.0.1:8080',//'http://127.0.0.1:8080',
  srvsftp:{
      host: process.env.srvsftp_host||'vpn.czjcd.com',
      port: process.env.srvsftp_port||'22',
      username: process.env.srvsftp_username||'root',
      password: process.env.srvsftp_password||'DownUp2U'
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
