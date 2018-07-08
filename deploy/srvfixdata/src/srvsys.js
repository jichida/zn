const _ = require('lodash');
const DBModels = require('../src/handler/models.js');
const debug = require('debug')('srvfixdata:start');
const winston = require('./log/log.js');
const async = require('async');
const config = require('./config');
const moment = require('moment');
const startbaseinfovehicle = require('./fix/baseinfovehicle');
const startbaseinfodriver = require('./fix/baseinfodriver');
const startbaseinfovehicleinsurance = require('./fix/baseinfovehicleinsurance');
const startbaseinfodrivereducate = require('./fix/baseinfodrivereducate');
const startbaseinfovehicletotalmile = require('./fix/baseinfovehicletotalmile');
const startrateddriver = require('./fix/rateddriver');
const startaddressfix = require('./fix/addressfix');
const startbaseinfodriverapp = require('./fix/baseinfodriverapp');

const start = (callbackfn)=>{
  winston.getlog().info(`开始执行`);
  debug(`开始执行`)
  let fnsz = [];
  fnsz.push((callbackfn)=>{
    startbaseinfovehicle(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startbaseinfodriver(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startbaseinfovehicleinsurance(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startbaseinfodrivereducate(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startbaseinfovehicletotalmile(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startrateddriver(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startaddressfix(callbackfn);
  });
  fnsz.push((callbackfn)=>{
    startbaseinfodriverapp(callbackfn);
  });


  async.parallelLimit(fnsz,1,(err,result)=>{
    debug(`执行完毕`)
    winston.getlog().info(`执行完毕`);
  });
};


module.exports= start;
