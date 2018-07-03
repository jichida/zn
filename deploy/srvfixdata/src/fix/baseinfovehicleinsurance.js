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
const deletedup_baseinfovehicleinsurance = (vehiclelist,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBPlatformModels.Platform_baseInfoVehicleInsuranceModel;

  let Platform_baseInfoVehicleIdIds = [];
  _.map(vehiclelist,({Platform_baseInfoVehicleId,VehicleNo})=>{
    Platform_baseInfoVehicleIdIds.push(Platform_baseInfoVehicleId);
    fnsz.push((callbackfn)=>{
      dbModel.count({Platform_baseInfoVehicleId},(err,count)=>{
        if(!err && count > 1){
          dbModel.remove({Platform_baseInfoVehicleId},(err,result)=>{
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
const addnewrecords_baseinfovehicleinsurance = (vehiclelist,callbackfn)=>{
  const UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  let fnsz = [];
  _.map(vehiclelist,({Platform_baseInfoVehicleId,VehicleNo})=>{
    // debug(`Platform_baseInfoVehicleId-->${Platform_baseInfoVehicleId},VehicleNo:${VehicleNo}`);
    fnsz.push((callback)=>{
      const dbModel = DBPlatformModels.Platform_baseInfoVehicleInsuranceModel;
      let objSetOnInsert =  {
          "InsurEff" : "2018-02-08",
           "InsurExp" : "2019-09-30",
           Platform_baseInfoVehicleId,
           "InsurCom" : "中国人寿保险",
           "InsurNum" : "215445",
           "InsurType" : "安全险",
           "InsurCount" : 50000,
           UpdateTime,
           "Flag" : 1,
            VehicleNo,
           "isuploaded" : 0
      };
      let updated_data = {"$set":{}};
      updated_data["$setOnInsert"] = objSetOnInsert;

      dbModel.findOneAndUpdate({Platform_baseInfoVehicleId},updated_data,{new: true,upsert:true},(err,result)=>{
        callback(null,true);
      });
    });

  })

  async.parallelLimit(fnsz,100,(err,result)=>{
    callbackfn();
  });
};


const startbaseinfovehicleinsurance = (callbackfn)=>{
  debug(`startbaseinfovehicleinsurance-->`)
  get_baseinfovehicle((vehiclelist)=>{
    deletedup_baseinfovehicleinsurance(vehiclelist,()=>{
      addnewrecords_baseinfovehicleinsurance(vehiclelist,()=>{
        if(!!callbackfn){
          callbackfn(null,true);
        }
      });
    });
  });
}

module.exports= startbaseinfovehicleinsurance;
