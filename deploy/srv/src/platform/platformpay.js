let PubSub = require('pubsub-js');
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
  //通知平台插入
  PubSub.publish('Platformmsgs', {
      action:'Insert',
      type:'Platform_operatePay',
      payload:{triporder:order}
  });

}

exports.notifyplatform_orderpaied = notifyplatform_orderpaied;
