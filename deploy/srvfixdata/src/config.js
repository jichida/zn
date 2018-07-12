const moment = require('moment');
const config =  {
  mongodburl:process.env.MONGO_URL || 'mongodb://yunqi.com28.cn:27018/zhongnandb',
  mongos:process.env.mongos==='true'?true:false,
  logdir:process.env.logdir ||'/app/zn/deploy/dist/log',
  version:'1.0.0'
};



module.exports = config;
