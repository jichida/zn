const _ = require('lodash');
const DBModels = require('../handler/models.js');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:baseinfovehicleinsurance');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//获取到用户信息中的Platform_baseInfoVehicleId

const getbaseInfoVehicleIdlistFromUserdrivers =(callbackfn)=>{
  const dbModel =  DBModels.UserDriverModel;
  dbModel.find({}).populate([
    {
      path: 'defaultmycar',
      model: 'mycar',
      select:'_id Platform_baseInfoVehicleId',
      populate: [
        {
          path: 'Platform_baseInfoVehicleId',
          model: 'baseinfovehicle'
        }
      ]
    }]).lean().exec((err,result)=>{
    let list_mycar = [];
    let list_baseinfovehicle = [];
    if(!err && !!result){
      debug(`result--->${JSON.stringify(result)}`);
      // _.map(result,(r)=>{
      //   list.push(_)
      // })
    }

    callbackfn({list_mycar,list_baseinfovehicle});
  });
}

//设置到
const set_baseinfovehicle = (Platform_baseInfoVehicleIdlist,callbackfn)=>{
  const dbModel = DBPlatformModels.Platform_baseInfoVehicleModel;
  dbModel.remove({_id:{
    $nin:Platform_baseInfoVehicleIdlist
  }},(err,result)=>{
    callbackfn(err,result);
  });
}


const startbaseinfovehicle = ()=>{
  debug(`startbaseinfovehicle-->`)
  getbaseInfoVehicleIdlistFromUserdrivers(({list_mycar,list_baseinfovehicle})=>{

  });
}

module.exports= startbaseinfovehicle;
