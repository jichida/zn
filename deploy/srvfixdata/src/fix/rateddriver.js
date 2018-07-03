const _ = require('lodash');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:baseinfovehicleinsurance');
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
const deletedup_rateddriver = (driverlist,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBPlatformModels.Platform_ratedDriverModel;

  let Platform_baseInfoDriverIds = [];
  _.map(driverlist,({Platform_baseInfoDriverId,LicenseId})=>{
    Platform_baseInfoDriverIds.push(Platform_baseInfoDriverId);
    fnsz.push((callbackfn)=>{
      dbModel.count({Platform_baseInfoDriverId},(err,count)=>{
        if(!err && count > 1){
          dbModel.remove({Platform_baseInfoDriverId},(err,result)=>{
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
    dbModel.remove({Platform_baseInfoDriverId:{$nin:Platform_baseInfoDriverIds}},(err,result)=>{
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
    dbModel.find({},{_id:1,LicenseId:1},(err,result)=>{
      let driverlist = [];
      if(!err && !!result){
        _.map(result,(r)=>{
          driverlist.push({
            Platform_baseInfoDriverId:r._id,
            LicenseId:r.LicenseId
          });
        });
      }
      debug(`get_baseinfodriver--->${driverlist.length}`);
      callbackfn(driverlist);
    });
}
//添加不在的记录
const addnewrecords_rateddriver = (driverlist,callbackfn)=>{
  const TestDate = moment().format('YYYY-MM-DD');
  let fnsz = [];
  _.map(driverlist,({Platform_baseInfoDriverId,LicenseId})=>{
    // debug(`Platform_baseInfoVehicleId-->${Platform_baseInfoVehicleId},VehicleNo:${VehicleNo}`);
    fnsz.push((callback)=>{
      const dbModel = DBPlatformModels.Platform_ratedDriverModel;
      let objSetOnInsert =  {
        TestDate,
        LicenseId,
        "Level" : 4,
        "TestDepartment" : "自我考核",
        Platform_baseInfoDriverId,
        "isuploaded" : 0
      };
      let updated_data = {"$set":{}};
      updated_data["$setOnInsert"] = objSetOnInsert;

      dbModel.findOneAndUpdate({Platform_baseInfoDriverId},updated_data,{new: true,upsert:true},(err,result)=>{
        callback(null,true);
      });
    });

  })

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });
};


const startrateddriver = (callbackfn)=>{
  debug(`startbaseinfodrivereducate-->`)
  get_baseinfodriver((driverlist)=>{
    deletedup_rateddriver(driverlist,()=>{
      addnewrecords_rateddriver(driverlist,()=>{
        if(!!callbackfn){
          callbackfn(null,true);
        }
      });
    });
  });
}

module.exports= startrateddriver;
