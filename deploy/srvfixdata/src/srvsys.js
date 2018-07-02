const _ = require('lodash');
const DBModels = require('../src/handler/models.js');
const debug = require('debug')('srvfixdata:start');
const winston = require('./log/log.js');
const async = require('async');
const config = require('./config');
const moment = require('moment');
const startbaseinfovehicle = require('./fix/baseinfovehicle');

const start = (callbackfn)=>{
  winston.getlog().info(`开始执行`);
  startbaseinfovehicle();
};


module.exports= start;
