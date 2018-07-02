const winston = require('winston');
const moment = require('moment');
const path = require('path');
const config = require('../config');
let logger;
exports.initLog =  ()=>{
   const filename = "srvfixdata";//"bms_"+moment().format('YYYY-MM-DD-HHmmss');

  const logfile = filename+".log";
  const logdir = config.logdir || path.resolve(__dirname,'../../../log');
  const logpath = `${logdir}/${logfile}`;

  const logfileerr = filename+"_err.log";
  const logpatherr = `${logdir}/${logfileerr}`;

  const logfilewarn = filename+"_warn.log";
  const logpathwarn = `${logdir}/${logfilewarn}`;

  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: logpath ,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: logpatherr,
          level: 'error'
        }),
        new (winston.transports.File)({
          name: 'warn-file',
          filename: logpathwarn,
          level: 'warn'
        }),
      ]
  });
};

exports.getlog = ()=>{
   return logger;
}
