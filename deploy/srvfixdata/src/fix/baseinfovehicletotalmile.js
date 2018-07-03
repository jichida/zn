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
const deletedup_baseinfovehicletotalmile = (vehiclelist,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBPlatformModels.Platform_baseInfoVehicleTotalMileModel;

  let Platform_baseInfoVehicleIdIds = [];
  _.map(vehiclelist,({Platform_baseInfoVehicleId,VehicleNo})=>{
    Platform_baseInfoVehicleIdIds.push(Platform_baseInfoVehicleId);
    fnsz.push((callbackfn)=>{
      dbModel.count({VehicleNo},(err,count)=>{
        if(!err && count > 1){
          dbModel.remove({VehicleNo},(err,result)=>{
            debug(`删除--->${VehicleNo}`);
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
    dbModel.remove({Platform_baseInfoVehicleId:{$nin:Platform_baseInfoVehicleIdIds}},(err,result)=>{
      debug(`删除不存在的车辆---`);
      callbackfn(null,true);
    });
  });

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });

}
const get_baseinfovehicle = (callbackfn)=>{
    const dbModel = DBPlatformModels.Platform_baseInfoVehicleModel;
    dbModel.find({},{_id:1,VehicleNo:1},(err,result)=>{
      let vehiclelist = [];
      if(!err && !!result){
        _.map(result,(r)=>{
          vehiclelist.push({
            Platform_baseInfoVehicleId:r._id,
            VehicleNo:r.VehicleNo
          });
        });
      }
      debug(`get_baseinfovehicle--->${vehiclelist.length}`);
      callbackfn(vehiclelist);
    });
}
//添加不在的记录
const addnewrecords_baseinfovehicletotalmile = (vehiclelist,callbackfn)=>{
  const UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  let fnsz = [];
  _.map(vehiclelist,({Platform_baseInfoVehicleId,VehicleNo})=>{
    // debug(`Platform_baseInfoVehicleId-->${Platform_baseInfoVehicleId},VehicleNo:${VehicleNo}`);
    fnsz.push((callback)=>{
      const dbModel = DBPlatformModels.Platform_baseInfoVehicleTotalMileModel;
      let objSetOnInsert =  {
        VehicleNo,
        UpdateTime,
        "TotalMile" : 0,
        "Address" : 341100.0,
        "isuploaded" : 0
      };
      let updated_data = {"$set":{}};
      updated_data["$setOnInsert"] = objSetOnInsert;

      dbModel.findOneAndUpdate({VehicleNo},updated_data,{new: true,upsert:true},(err,result)=>{
        callback(null,true);
      });
    });
  });

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });
};


const startbaseinfovehicletotalmile = (callbackfn)=>{
  debug(`startbaseinfovehicletotalmile-->`)
  get_baseinfovehicle((vehiclelist)=>{
    deletedup_baseinfovehicletotalmile(vehiclelist,()=>{
      addnewrecords_baseinfovehicletotalmile(vehiclelist,()=>{
        if(!!callbackfn){
          callbackfn(null,true);
        }
      });
    });
  });
}

module.exports= startbaseinfovehicletotalmile;
