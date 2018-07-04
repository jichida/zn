const _ = require('lodash');
const DBModels = require('../handler/models.js');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:addressfix');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
// 3. 行政区划 address ，
// 包括服务机构、
// 经营许可、
// 车辆、
// 驾驶员、
// 运价类型、
// 车辆里程统计，
// 订单发起、
// 订单派单成功、
// 经营支付等，建议用运营城市的行政区划，如530100，不要用具体城区的530102

const getAddress = (address)=>{
  const addressnew = Math.floor(address/100);
  const retv = addressnew*100;
  return parseInt(retv);
}

const addressfix_forpay = (DBModel,idstring,callbackfn)=>{
  const dbModel =  DBModel;
  dbModel.find({},{
    '_id':1,
    'OnArea':1,
  })
  .lean().exec((err,result)=>{
    let fnsz = [];
    if(!err && !!result){
      debug(`addressfix:${idstring}--->${result.length}`);
      _.map(result,(r)=>{
        fnsz.push((callback)=>{
          if(!!r.OnArea){
            const OnArea = getAddress(r.OnArea);
            debug(`${idstring}--->${r._id}--->${r.OnArea}-->${OnArea}`);
            dbModel.findOneAndUpdate({_id:r._id},{
              $set:{OnArea}
            },(err,result)=>{
              callback(null,true);
            })
          }
          else{
            debug(`${idstring}---${r._id}--->OnArea为空`);
            callback(null,true);
          }
        })
      });

      async.parallelLimit(fnsz,100,(err,result)=>{
        callbackfn();
      });
    }
  });
}

const addressfix = (DBModel,idstring,callbackfn)=>{
  const dbModel =  DBModel;
  dbModel.find({},{
    '_id':1,
    'Address':1
  })
  .lean().exec((err,result)=>{
    let fnsz = [];
    if(!err && !!result){
      debug(`addressfix:${idstring}--->${result.length}`);
      _.map(result,(r)=>{
        fnsz.push((callback)=>{
          if(!!r.Address){
            const Address = getAddress(r.Address);
            debug(`${r._id}--->${r.Address}-->${Address}`);
            dbModel.findOneAndUpdate({_id:r._id},{
              $set:{Address}
            },(err,result)=>{
              callback(null,true);
            })
          }
          else{
            debug(`${idstring}---${r._id}--->Address为空`);
            callback(null,true);
          }
        })
      });

      async.parallelLimit(fnsz,100,(err,result)=>{
        callbackfn();
      });
    }
  });
}

const startaddressfix = (callbackfn)=>{
  let fnsz = [];
  //服务机构
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoCompanyServiceModel,'服务机构',()=>{
      callback(null,true);
    });
  });
  //经营许可
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoCompanyPermitModel,'经营许可',()=>{
      callback(null,true);
    });
  });
  //车辆
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoVehicleModel,'车辆',()=>{
      callback(null,true);
    });
  });
  //驾驶员
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoDriverModel,'驾驶员',()=>{
      callback(null,true);
    });
  });
  //运价类型
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoCompanyFareModel,'运价类型',()=>{
      callback(null,true);
    });
  });
  //车辆里程统计
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_baseInfoVehicleTotalMileModel,'车辆里程统计',()=>{
      callback(null,true);
    });
  });
  //订单发起
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_orderCreateModel,'订单发起',()=>{
      callback(null,true);
    });
  });
  //订单派单成功
  fnsz.push((callback)=>{
    addressfix(DBPlatformModels.Platform_orderMatchModel,'订单派单成功',()=>{
      callback(null,true);
    });
  });
  //经营支付<-------------------------------
  fnsz.push((callback)=>{
    addressfix_forpay(DBPlatformModels.Platform_operatePayModel,'经营支付',()=>{
      callback(null,true);
    });
  });

  async.parallelLimit(fnsz,2,(err,result)=>{
    if(!!callbackfn){
      callbackfn(null,true);
    }
  });
}


module.exports= startaddressfix;
