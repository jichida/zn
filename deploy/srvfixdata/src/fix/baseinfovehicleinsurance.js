const _ = require('lodash');
const DBPlatformModels = require('../handler/models.js');
const debug = require('debug')('srvfixdata:baseinfovehicleinsurance');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//车辆保险信息应与车辆数量相符。
const set_baseinfovehicleinsurance = (vehiclelist,callbackfn)=>{
  const dbModel = DBPlatformModels.Platform_baseInfoVehicleInsuranceModel;
  dbModel.remove({Platform_baseInfoVehicleId:{
    $nin:vehiclelist
  }},(err,result)=>{
    callbackfn(err,result);
  });
}
