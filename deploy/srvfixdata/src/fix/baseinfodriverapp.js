const _ = require('lodash');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:baseinfodriverapp');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//车辆保险信息应与车辆数量相符。

//每个车辆一条记录，去掉重复记录
// const set_baseinfovehicleinsurance = (vehiclelist,callbackfn)=>{
//   const dbModel = DBPlatformModels.Platform_baseInfoVehicleInsuranceModel;
//   dbModel.remove({Platform_baseInfoVehicleId:{
//     $nin:vehiclelist
//   }},(err,result)=>{
//     callbackfn(err,result);
//   });
// }
const deletedup_baseinfodriverapp = (driverlist,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBPlatformModels.Platform_baseInfoDriverAppModel;

  let LicenseIds = [];
  _.map(driverlist,({DriverPhone,LicenseId,Address})=>{
    LicenseIds.push(LicenseId);
    fnsz.push((callbackfn)=>{
      dbModel.count({LicenseId},(err,count)=>{
        if(!err && count > 1){
          dbModel.remove({LicenseId},(err,result)=>{
            debug(`删除--->${LicenseId}`);
            callbackfn(null,true);
          });
        }
        else{
          callbackfn(null,true);
        }
      })
    });
  });

  fnsz.push((callbackfn)=>{
    //删除不存在的车辆
    dbModel.remove({LicenseId:{$nin:LicenseIds}},(err,result)=>{
      debug(`删除不存在的驾驶员---`);
      callbackfn(null,true);
    });
  });

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });

}
const get_baseinfodriver = (callbackfn)=>{
    const dbModel = DBPlatformModels.Platform_baseInfoDriverModel;
    dbModel.find({},{_id:1,LicenseId:1,DriverPhone:1,Address:1},(err,result)=>{
      let driverlist = [];
      if(!err && !!result){
        _.map(result,(r)=>{
          driverlist.push({
            DriverPhone:r.DriverPhone,
            Address:r.Address,
            LicenseId:r.LicenseId
          });
        });
      }
      debug(`get_baseinfodriver--->${driverlist.length}`);
      callbackfn(driverlist);
    });
}
//添加不在的记录
const addnewrecords_baseinfodriverapp = (driverlist,callbackfn)=>{
  const UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  let fnsz = [];
  _.map(driverlist,({DriverPhone,LicenseId,Address})=>{
    // debug(`Platform_baseInfoVehicleId-->${Platform_baseInfoVehicleId},VehicleNo:${VehicleNo}`);
    fnsz.push((callback)=>{
      const dbModel = DBPlatformModels.Platform_baseInfoDriverAppModel;
      let updated_data = {"$set":{
        LicenseId,
        DriverPhone,
        Address
      }};
      dbModel.findOneAndUpdate({LicenseId},updated_data,{new: true},(err,result)=>{
        callback(null,true);
      });
    });
  });

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });
};


const startbaseinfodriverapp = (callbackfn)=>{
  debug(`startbaseinfodriverapp-->`)
  get_baseinfodriver((driverlist)=>{
    deletedup_baseinfodriverapp(driverlist,()=>{
      addnewrecords_baseinfodriverapp(driverlist,()=>{
        if(!!callbackfn){
          callbackfn(null,true);
        }
      });
    });
  });
}

module.exports= startbaseinfodriverapp;
