const async = require('async');
const PubSub = require('pubsub-js');
const moment = require('moment');
// const DBModels = require('../db/models.js');
const dbplatform = require('../db/modelsplatform.js');

const interval_baseInfoCompanyStat = ()=>{

  const fn_VehicleNum = (callbackfn)=>{
      const vehicleModel = dbplatform.Platform_baseInfoVehicleModel;
      vehicleModel.count({
            },(err, list)=> {
          callbackfn(err,list);
      });
  };

  const fn_DriverNum = (callbackfn)=>{
      const driverModel = dbplatform.Platform_baseInfoDriverModel;
      driverModel.count({
            },(err, list)=> {
          callbackfn(err,list);
      });
  };

  let asyncfnsz = [fn_VehicleNum,fn_DriverNum];
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err && !!result){
      const VehicleNum = result[0];
      const DriverNum = result[1];
      const baseInfoCompanyStat = dbplatform.Platform_baseInfoCompanyStatModel;
      let entity = new baseInfoCompanyStat({
        VehicleNum,
        DriverNum,
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss')
      });
      entity.save((err,result)=>{
        if(!err && !!result){
          PubSub.publish('platformmessage_upload',{
            action:'save',//'findByIdAndUpdate',
            collectionname:'baseinfocompanystat',//'baseinfocompany',
            doc:result
          });
        }
      });
    }
  });
}

const interval_baseInfoDriverStat = ()=>{
  // let Platform_baseInfoDriverStatSchema= new Schema({
  //   CompanyId:String,	//		是	字符型V32	公司标识
  //   Address:Number,//	是数字型F6注册地行政区划代码车辆在平台的注册地， 见 GB/T2260
  //   LicenseId:String,	//		是	字符型V32	机动车驾驶证编号
  //   Cycle:Number,//	 是 数字型 F6统计周期统计周期按月 ，内容填 写统计月份 ，数据格式 YYYYMM
  //   OrderCount:Number,//		是	数字型 VIO	完成订单次数
  //   TafficViolationCount:Number,//		是	数字型V32	交通违章次数
  //   ComplainedCount:Number,//		是	数字型V32	被投诉次数
  //   Flag:Number,//	 是 数字型 Fl操作标识1:新增2 :更新3 :删除
  //   UpdateTime:String,//	是数字型F14更新时间网约车平台完成数据更 新的时间YYYYMMDDhhmmss
  // });

  
}

exports.interval_baseInfoCompanyStat= interval_baseInfoCompanyStat;
exports.interval_baseInfoDriverStat= interval_baseInfoDriverStat;
