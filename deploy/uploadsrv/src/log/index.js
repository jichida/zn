const winston = require('winston');
const moment = require('moment');
const path = require('path');
const config = require('../config.js');
let logger;
exports.initLog =  ()=>{
  var filename = `uploadsrv`;

  var logfile = `${config.logdir}/${filename}.html`;
  var logpath = path.resolve(__dirname,'../', logfile);
  console.log(`logpath==>${logpath}`);

  var logfileerr = `${config.logdir}/${filename}_err.html`;
  var logpatherr = path.resolve(__dirname,'../', logfileerr);

  var logfilewarn = `${config.logdir}/${filename}_warn.html`;
  var logpathwarn = path.resolve(__dirname,'../', logfilewarn);

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
