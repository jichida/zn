const config = require('./src/config');
const winston = require('./src/log/log.js');
const DBModels = require('./src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const job = require('./src/srvsys');
// const startsrv = require('./src/test');//《------
const moment = require('moment');
const debug = require('debug')('srvfixdata:start');

// const index = _.findIndex(['A1','A2','A3','B1','B2','C1','C2','C3','C4','C5','D','E','F','M','N','P'],(o)=>{return o==='C1'});
// console.log(`-->${index}`);
// if( index === -1){
//   console.log('-->字段DriverType非法,但目前是:【C1】');
// }
// return;

debug(`start=====>version:${config.version},mongodburl:${config.mongodburl}`);

winston.initLog();
process.setMaxListeners(0);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    mongos:config.mongos,

    // useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });

debug(`connected success!${moment().format('YYYY-MM-DD HH:mm:ss')}`);
job();

winston.getlog().info(`==程序启动${config.version}===`);



process.on('unhandledRejection', (err) => {
  winston.getlog().info(`unhandledRejection:${JSON.stringify(err)}`);
})

process.on('unhandledException', (err) => {
  winston.getlog().info(`unhandledException:${JSON.stringify(err)}`);
})

winston.getlog().info(`===执行到末尾===`);
