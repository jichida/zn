const config = {
  CompanyId:'zncx',
  logdir:process.env.logdir||'/app/zn/logs',
  platformserverurl:process.env.platformserverurl||'http://127.0.0.1:8080',//'http://127.0.0.1:8080',
  srvsftp:{
      host: process.env.srvsftp_host||'vpn.czjcd.com',
      port: process.env.srvsftp_port||'22',
      username: process.env.srvsftp_username||'root',
      password: process.env.srvsftp_password||'DownUp2U'
  },
  srvredis:{
    host:process.env.srvredis_host||'192.168.0.1'
  }
};

module.exports = config;
