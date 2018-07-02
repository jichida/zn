const _ = require('lodash');
const DBModels = require('../handler/models.js');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:baseinfovehicleinsurance');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//获取到用户信息中的Platform_baseInfoVehicleId

const getbaseInfoDriverIdlistFromUserdrivers =(callbackfn)=>{
  const dbModel =  DBModels.UserDriverModel;
  dbModel.find({},{
    'Platform_baseInfoDriverId':1,
  })
  .lean().exec((err,result)=>{
    let list_baseinfodriverid = [];
    if(!err && !!result){
      debug(`getbaseInfoVehicleIdlistFromUserdrivers--->${result.length}`);
      _.map(result,(r)=>{
        const Platform_baseInfoDriverId =  _.get(r,'Platform_baseInfoDriverId');
        if(!!Platform_baseInfoDriverId){
          list_baseinfodriverid.push(Platform_baseInfoDriverId);
        }
      });
    }

    callbackfn({list_baseinfodriverid});
  });
}



const set_baseinfodriver = (Platform_baseInfoVehicleIdlist,callbackfn)=>{
  if(Platform_baseInfoVehicleIdlist.length >= 200){
    const dbModel = DBPlatformModels.Platform_baseInfoDriverModel;
    dbModel.remove({_id:{
      $nin:Platform_baseInfoVehicleIdlist
    }},(err,result)=>{
      debug(`删除多余司机[baseinfodriver]成功`);
      callbackfn(err,result);
    });
  }
  else{
    debug(`baseinfodriver 数据不到200`);
    callbackfn(null,true);
  }
}

const startbaseinfodriver = ()=>{
  debug(`startbaseinfodriver-->`)
  getbaseInfoDriverIdlistFromUserdrivers(({list_baseinfodriverid})=>{
    set_baseinfodriver(list_baseinfodriverid,()=>{

    });

  });
}

module.exports= startbaseinfodriver;
