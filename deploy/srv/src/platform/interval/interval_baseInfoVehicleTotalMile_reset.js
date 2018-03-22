const dbplatform = require('../../db/modelsplatform.js');
const _ = require('lodash');
const moment = require('moment');
const async = require('async');

const interval_setvehicle = (vehicleno,calcmile,callbackfn)=>{

  const dbVehicleModel = dbplatform.Platform_baseInfoVehicleModel;
  const queryexec = dbVehicleModel.findOne({VehicleNo:vehicleno}).select({Address:1});
  queryexec.exec((err,vechicleinfo)=>{
    if(!err && !!vechicleinfo){
        const dbModel = dbplatform.Platform_baseInfoVehicleTotalMileModel;
        dbModel.findOneAndUpdate({VehicleNo:vehicleno},
          {
            $set:{
              VehicleNo:vehicleno,
              UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
              Address : vechicleinfo.Address
            },
            $inc:{TotalMile:calcmile}
          },{
            new:true,
            upsert:true
          },
          (err,result)=>{
          if(!err && !!result){
            callbackfn(result);
          }
          else{
            ////console.log(err);
            callbackfn(null);
          }
        });
      }
    });
}

const interval_baseInfoVehicleTotalMile_reset = (callbackfn)=>{
  let asyncfnsz = [];

  const dbVehicleModel = dbplatform.Platform_baseInfoVehicleModel;
  const queryexec = dbVehicleModel.find({}).select({_id:0,VehicleNo:1});
  queryexec.exec((err,result)=>{
    if(!err && !!result){
      _.map(result,(vehicleinfo)=>{
        const vehicleno = _.get(vehicleinfo,'VehicleNo');
        if(!!vehicleno){
          let fn = (callbackfn)=>{
            interval_setvehicle(vehicleno,0,(result)=>{
              callbackfn(result);
            });
          }
          asyncfnsz.push(fn);
        }
      });
    }


      async.parallel(asyncfnsz,(err,result)=>{
        callbackfn(null,result);
      });
  });


}

module.exports = interval_baseInfoVehicleTotalMile_reset;
