const _ = require('lodash');
const DBModels = require('../handler/models.js');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:operatepay');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');

const get_operatepay = (callbackfn)=>{
  const dbModel = DBPlatformModels.Platform_operatePayModel;
  dbModel.find({},{_id:1,OrderId:1}).lean().exec((err,result)=>{
    let list = [];
    let listorderids = [];
    _.map(result,(info)=>{
      list.push(info);
      listorderids.push(info.OrderId);
    });
    debug(`listorderids-->${listorderids.length}`)
    callbackfn({list,listorderids});
  });
}

const get_orderidmaps = (listorderids,callbackfn)=>{
  const dbModel = DBModels.TripOrderModel;
  dbModel.find({
    _id:{$in:listorderids}
  }).lean().exec((err,result)=>{
    let maporders = {};
    _.map(result,(info)=>{
      maporders[info._id] = info;
    });
    // debug(`listorderids-->${JSON.stringify(maporders)}`)
    callbackfn(maporders);
  });
};

const fix_operatepay = (callbackfn)=>{
  get_operatepay(({list,listorderids})=>{
    get_orderidmaps(listorderids,(maporders)=>{
      let fnsz = [];
      _.map(list,({_id,OrderId})=>{
        fnsz.push((callbackfn)=>{
          const orderinfo = maporders[OrderId];
          if(!!orderinfo){
            const updatedata = {
              DriverName:_.get(orderinfo,'driverinfo.DriverName',''),
              VehicleNo:_.get(orderinfo,'driverinfo.VehicleNo',''),
              DepArea:_.get(orderinfo,'srcaddress.addressname',''),
              DestArea:_.get(orderinfo,'dstaddress.addressname',''),
              BookModel:_.get(orderinfo,'driverinfo.Model',''),
              Model:_.get(orderinfo,'driverinfo.Model',''),
              LineName:_.get(orderinfo,'paytype',''),
              LinePrice:_.get(orderinfo,'realprice',0),
            }
            const dbModel = DBPlatformModels.Platform_operatePayModel;
            dbModel.update({_id},{$set:updatedata},(err,result)=>{
              callbackfn(null,true);
            });
          }
          // else{
          //   console.log(`${OrderId} is not exists`)
          // }
        });
      });

      async.parallelLimit(fnsz,100,(err,result)=>{
        callbackfn(null,true);
      });
    });
  })
}
module.exports= fix_operatepay;
