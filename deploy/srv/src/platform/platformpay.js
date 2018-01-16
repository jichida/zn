
const mongoose = require('mongoose');
const dbplatform = require('../db/modelsplatform.js');
const PubSub = require('pubsub-js');
const _ = require('lodash');
const utilarea = require('../util/getarea');
// getarea({
//   deplatlng:{
//     lat:32.04,
//     lng:118.77,
//   },
//   destlatlng:{
//     lat:32.04,
//     lng:118.77,
//   },
// },(result)=>{
//   console.log(result);
// });
//triporder.resultpricedetail.fareid
// const getBaseInfoCompanyFare = (param={
//   distance:0,
//   during:0,
//   curtime: moment().format('YYYY-MM-DD HH:mm:ss'),
//   fareid:'58da12b971983947079ae4f8'
// },callback)=>{
//   let curtime = param.curtime ||  moment().format('YYYY-MM-DD HH:mm:ss');
//   let curtimeformatted = curtime;
//   if (typeof curtimeformatted === 'string') {
//     curtimeformatted =  moment(curtimeformatted).format('YYYY-MM-DD HH:mm:ss')
//   }
//   let fareModel = dbplatform.Platform_baseInfoCompanyFareModel;
//   fareModel.findOne({_id:param.fareid},(err,baseInfoCompanyFare)=>{
//     if(!err && !!baseInfoCompanyFare){
//
//         callback(null,{
//           Price:price.toFixed(2),
//           FareType:param.fareid,
//           DriveMile:totalkm.toFixed(2),
//           DriveTime:param.during,
//           FarUpPrice:0,
//           OtherUpPrice:0,
//
//           pricelistdetail,
//           // pricestringdetail:pricestringdetail,
//           // pricestringdebug:pricestringdebug,
//           totalkm:totalkm.toFixed(2),
//           calcUnitPricePerMile:calcUnitPricePerMile.toFixed(2),
//           totalduringminute:totalduringminute.toFixed(2),
//           calcUnitPricePerMinute:calcUnitPricePerMinute.toFixed(2)
//         });
//     }
//     else{
//       callback();
//     }
//
//   });
// }

// const getfare = (fareid,()=>{
//   if(typeof fareid === 'string'){
//     fareid = mongoose.Types.ObjectId(fareid);
//   }
//   const fareModel = dbplatform.Platform_baseInfoCompanyFareModel;
//   fareModel.findOne({_id:fareid},(err,baseInfoCompanyFare)=>{
//     if(!err && !!baseInfoCompanyFare){
//       const FareType = fareid.toString();
//       const Price =
//     }
//   });
//
// });

//http://lbs.amap.com/api/webservice/guide/api/georegeo
const notifyplatform_orderpaied = (order)=>{
// 1、根据高德接口获取 行政区域编号（上车&下车）
// 2、查询运价
// 3、根据支付方式查询支付结构
  // OrderId:String,		//	是	字符型	V64	订单编号
  // OnArea:Number,	//	是	数字型	F6	上车位置行政区划编号	见 GB/T 2260
  // DriverName:String,		//	否	字符型	V64	机动车驾驶员姓名
  // LicenseId:String,		//	是	字符型	V32	机动车驾驶证号
  // FareType:String,		//	是	字符型	V16	运价类型编码	由网约车公司定义，与 A. 4. 6运价信息 接 口一一 对应
  // VehicleNo:String,		//	是	字符型	V32	车辆号牌
  // BookDepTime:String,	//	是	数字型	F14	预计上车时间	YYYYMMDDhhmmss
  // WaitTime:Number,	//	否	数字型	V10	等待时间	单位 :秒
  // DepLongitude:Number,	//	是	数字型	V10	车辆出发经度	单位 :1怜 10-6 度
  // DepLatitude:Number,	//	是	数字型	V10	车辆 出发纬度	单位 :1传 10-6 度
  // DepArea:String,		//	否	字符型	V128	上车地点
  // DepTime:String,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
  // DestLongitude:Number,	//	是	数字型	V 10	车辆到达经度	单位 :1铃 10-6 度
  // DestLatitude:Number,	//	是	数字型	VI0	车辆到达纬度	单位 :1铃 10-6 度
  // DestArea:String,		//	否	字符型	V128	下车地点
  // DestTime:String,	//	是	数字型	F14	下车时间	YYYYMMDDhhmm ss
  // BookModel:String,		//	否	字符型	V64	预定车型
  // Model:String,		//	否	字符型	V64	实际使用车型
  // DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
  // DriveTime:Number,	//	是	数字型	V10	载客时间	单位 :秒
  // WaitMile:Number,	//	否	数字型	V10	空驶里程	单位 :km
  // FactPrice:Number,	//	是	数字型	V10	实收金额	单位:元
  // Price:Number,	//	否	数字型	V10	应收金额	单位 :元
  // CashPrice:Number,	//	否	数字型	V10	现金支付金额	单位 :元
  // LineName:String,		//	否	字符型	V64	电子支付机构
  // LinePrice:Number,	//	否	数字型	V10	电子支付金额	单位 :元
  // PosName:String,		//	否	字符型	 V64	POS 机支付机构
  // PosPrice:Number,	//	否	数字型	V10	POS 机支付金额	单位:元
  // BenfitPrice:Number,	//	否	数字型	V10	优惠金额	单位 :元
  // BookTip:Number,	//	否	数字型	 V10	预约服务费	单位:元
  // PassengerTip:Number,	//	否	数字型	  V10	附加费	单位:元	高峰时段时间 加价金
  // PeakUpPrice:Number,	//	否	数字型	V10	额	单位:.:7G
  // NightUpPrice:Number,	//	否	数字型	V10	夜间时段里程加价金 额	单位:元
  // FarUpPrice:Number,	//	是	数字型	V10	远途加价金额	单位:元
  // OtherUpPrice:Number,	//	是	数字型	V10	其他加价金额	单位:元
  // PayState:String,		//	是	字符型	  V32	结算状态	数据取值有效范围 :O .未结算1. 已结算2 :未知
  // PayTime:String,	//	否	数字型	F14	乘客结算时间	YYYYMMDDhhmmss
  // OrderMatchTime:String,	//	否	数字型	F14	订单完成时间	YYYY MMDDhhmm ss
  // InvoiceStatus:String,		//	 是	字符型	 V32	发票状态	数据取值有效范围 :0:未开票1.已开票	2 :未知
  //
  let updateddata = {
    BookModel:_.get(order,'driverinfo.Model',''),
    LicenseId:_.get(order,'driverinfo.LicenseId',''),
    DriverName:_.get(order,'driverinfo.avatarURL',''),
    VehicleNo:_.get(order,'driver.VehicleNo',''),
    OrderId:_.get(order,'_id',''),
    FareType:_.get(order,'ctxrealtimeprice.fareid',''),
    BookDepTime:_.get(order,'dated_at',order.created_at),
    DepLongitude:order.getinlocation[0],//_.get(order,'getinlocation')
    DepLatitude:order.getinlocation[1],
    DepTime:_.get(order,'getindate_at',''),
    DestLongitude:order.getofflocation[0],
    DestLatitude:order.getofflocation[1],
    DestTime:order.getoffdate_at,
    DriveMile:Math.ceil(_.get(order,'ctxrealtimeprice.totaldistance',0)/1000),
    DriveTime:_.get(order,'ctxrealtimeprice.totalduring'),
    FactPrice:_.get(order,'realprice',order.orderprice),
    Price:order.orderprice,
    FarUpPrice:0,
    OtherUpPrice:0,
    PayState:1,
    PayTime:_.get(order,'pay_at',''),
    OrderMatchTime:_.get(order,'finished_at',''),
    InvoiceStatus:2,
  };
  utilarea.getareasz({
    deplatlng:{
      lat:order.getinlocation[1],
      lng:order.getinlocation[0],
    },
    destlatlng:{
      lat:order.getofflocation[1],
      lng:order.getofflocation[0],
    },
  },(result)=>{
    // console.log(result);
    updateddata = _.merge(updateddata,result);
    //通知平台插入
    PubSub.publish('Platformmsgs', {
        action:'Insert',
        type:'Platform_operatePay',
        payload:updateddata
    });
  });
}

exports.notifyplatform_orderpaied = notifyplatform_orderpaied;
