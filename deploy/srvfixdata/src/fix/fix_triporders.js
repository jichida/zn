const _ = require('lodash');
const DBModels = require('../handler/models.js');
const DBPlatformModels = require('../handler/modelsplatform.js');
const debug = require('debug')('srvfixdata:operatepay');
const winston = require('../log/log.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');

//车辆保险信息应与车辆数量相符。
const get_baseinfodriver = (callbackfn)=>{
    const dbModel = DBModels.UserDriverModel;
    dbModel.find({},{_id:1},(err,result)=>{
      let driverlist = [];
      if(!err && !!result){
        _.map(result,(r)=>{
          driverlist.push({
            _id:r._id,
          });
        });
      }
      debug(`get_baseinfodriver--->${driverlist.length}`);
      callbackfn(driverlist);
    });
}

const get_triporders_info = (callbackfn)=>{
  debug(`start fix_triporders---`)

  get_baseinfodriver((driverlist)=>{
    debug(`fix_triporders--->${driverlist.length}`)
    const dbModel = DBModels.TripOrderModel;
    dbModel.find({
      "triptype" : {
        $in:['出租车','快车','代驾']
      },
      "paystatus" : "已支付",
      driveruserid:{$in:driverlist}
    }).populate([
        {
          path:'driveruserid',
          model: 'userdriver',
        }]).lean().exec((err,result)=>{
          let list = [];
          _.map(result,(tripinfo)=>{
            const payload = {
              _id:tripinfo._id,
              driverinfo:{
               "Model" : _.get(tripinfo,'driveruserid.Platform_baseInfoVehicle.Model',''),
               "Brand" :_.get(tripinfo,'driveruserid.Platform_baseInfoVehicle.Brand',''),
               "VehicleNo" :_.get(tripinfo,'driveruserid.Platform_baseInfoVehicle.VehicleNo',''),
               "Seats" : _.get(tripinfo,'driveruserid.Platform_baseInfoVehicle.Seats',''),
               "PlateColor" :_.get(tripinfo,'driveruserid.Platform_baseInfoVehicle.PlateColor',''),
               "DriverGender" : _.get(tripinfo,'driveruserid.Platform_baseInfoDriver.DriverGender',0),
               "DriverPhone" :_.get(tripinfo,'driveruserid.Platform_baseInfoDriver.DriverPhone',''),
               "DriverName" : _.get(tripinfo,'driveruserid.Platform_baseInfoDriver.DriverName',''),
               "starnum" :_.get(tripinfo,'driveruserid.starnum',3),
               "LicenseId" : _.get(tripinfo,'driveruserid.Platform_baseInfoDriver.LicenseId',''),
               "avatarURL" :_.get(tripinfo,'driveruserid.avatarURL',''),
              }
            }
            list.push(payload);
          });
       //    "Model" : null,
       // "Brand" : null,
       // "VehicleNo" : "皖MD0456",
       // "Seats" : 5,
       // "PlateColor" : null,
       // "DriverGender" : "男",
       // "DriverPhone" : "18019890099",
       // "DriverName" : "任兆福",
       // "starnum" : 0,
       // "LicenseId" : "342321197504011812",
       // "avatarURL" : "newimg/17.png"
      debug(`result--->${list.length}`)
      callbackfn(list);
    })
  });

}

const fix_triporders = (callbackfn)=>{
  get_triporders_info((infolist)=>{
    let fnsz = [];
    _.map(infolist,({_id,driverinfo})=>{
      fnsz.push((callbackfn)=>{
        const dbModel = DBModels.TripOrderModel;
        debug(`update--->${_id}-->${driverinfo.DriverName}`);
        dbModel.update({_id},{$set:{driverinfo}},(err,result)=>{
          callbackfn(null,true);
        });
      });
    });

    async.parallelLimit(fnsz,100,(err,result)=>{
      callbackfn(null,true);
    });
  });

}
module.exports= fix_triporders;
