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
  dbModel.find({},{
    '_id':1,
    'defaultmycar._id':1,
    'defaultmycar.Platform_baseInfoVehicleId._id':1
  })
  .populate([
    {
      path: 'defaultmycar',
      model: 'mycar',
      select:'_id Platform_baseInfoVehicleId',
      populate: [
        {
          path: 'Platform_baseInfoVehicleId',
          model: 'baseinfovehicle',
          select:'_id'
        }
      ]
    }])
    .lean().exec((err,result)=>{
    let list_mycar = [];
    let list_baseinfovehicle = [];
    if(!err && !!result){
      debug(`getbaseInfoVehicleIdlistFromUserdrivers--->${result.length}`);
      _.map(result,(r)=>{
        const mycarid = _.get(r,'defaultmycar._id');
        const Platform_baseInfoVehicleId =  _.get(r,'defaultmycar.Platform_baseInfoVehicleId._id');
        if(!!mycarid){
          list_mycar.push(mycarid);
        }
        if(!!Platform_baseInfoVehicleId){
          list_baseinfovehicle.push(Platform_baseInfoVehicleId);
        }
      });
    }

    callbackfn({list_mycar,list_baseinfovehicle});
  });
}

//设置到
const set_mycar = (list_mycar,callbackfn)=>{
  if(list_mycar.length >= 200){
    const dbModel = DBModels.MycarModel;
    dbModel.remove({_id:{
      $nin:list_mycar
    }},(err,result)=>{
      debug(`删除多余车辆[mycar]成功`);
      callbackfn(err,result);
    });
  }
  else{
    debug(`mycar 数据不到200`);
    callbackfn(null,true);
  }
}

const set_baseinfovehicle = (Platform_baseInfoVehicleIdlist,callbackfn)=>{
  if(Platform_baseInfoVehicleIdlist.length >= 200){
    const dbModel = DBPlatformModels.Platform_baseInfoVehicleModel;
    dbModel.remove({_id:{
      $nin:Platform_baseInfoVehicleIdlist
    }},(err,result)=>{
      debug(`删除多余车辆[baseinfovehicle]成功`);
      callbackfn(err,result);
    });
  }
  else{
    debug(`mycar 数据不到200`);
    callbackfn(null,true);
  }
}

const startbaseinfovehicle = ()=>{
  debug(`startbaseinfovehicle-->`)
  getbaseInfoVehicleIdlistFromUserdrivers(({list_mycar,list_baseinfovehicle})=>{
    set_mycar(list_mycar,()=>{

    });
    set_baseinfovehicle(list_baseinfovehicle,()=>{

    });

  });
}

module.exports= startbaseinfovehicle;
