const config = {
  CompanyId:'zncx',
  logdir:process.env.logdir||'../../dist/log',
  platformserverurl:process.env.platformserverurl||'http://127.0.0.1:8080',//'http://127.0.0.1:8080',
  srvsftp:{
      host: 'vpn.czjcd.com',
      port: '22',
      username: 'root',
      password: 'DownUp2U'
  },
  srvredis:{
    host:'192.168.0.1'
  }
};

module.exports = config;
