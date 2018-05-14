const moment = require('moment');
const _ = require('lodash');
const config = require('../config.js');
const debug = require('debug')("uploadsrv:processdata");
const winston = require('../log/index.js');

const getAddress = (address)=>{
  const address = Math.floor(address/1000);
  const retv = address*1000;
  return parseInt(retv);
}

const gettimefromstring = (timestring)=>{
  try{
    // debug(`gettimefromstring-->${timestring}`);
    if(!!timestring){
      let curtime = moment(timestring).format('YYYYMMDDHHmmss');
      return parseInt(curtime);
    }
  }
  catch(e){
    winston.getlog().error(`gettimefromstring-->${timestring}`);
  }
  let curtime = moment().format('YYYYMMDDHHmmss');
  return parseInt(curtime);
}
const getdatefromstring = (timestring)=>{
  try{
    // debug(`getdatefromstring-->${timestring}`);
    if(!!timestring){
      let curtime = moment(timestring).format('YYYYMMDD');
      return parseInt(curtime);
    }
  }
  catch(e){
    winston.getlog().error(`getdatefromstring-->${timestring}`);
  }
  let curtime = moment().format('YYYYMMDD');
  return parseInt(curtime);
}
const getgeonumberfloat6 = (lntlngnumber)=>{
  const retv = _.toNumber(lntlngnumber.toFixed(6))*1000000;
  return parseInt(retv);
}

const getFaretype = (faretype)=>{
  let faretypestring;
  if(typeof faretype === 'string'){
    if(faretype.length > 16){
      faretypestring = faretype.substr(faretype.length-16,16);
    }
  }
  return faretypestring;
}


const getplatformdata = (actionname,collectionname,doc,callbackfn)=>{
  let retdoc = doc;
  retdoc = _.omit(retdoc,['_id','__v','isuploaded']);
  // console.log(`retdoc==>${JSON.stringify(retdoc)}`);
  // console.log(`actionname==>${actionname}`);
  // console.log(`collectionname==>${collectionname}`);

  if(actionname === 'save' || actionname === 'findByIdAndUpdate' || actionname === 'upload'){
    retdoc.CompanyId = config.CompanyId;
    if(collectionname === 'baseinfocompany'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
      retdoc = _.omit(retdoc,['Companyld']);
    }
    else if(collectionname === 'baseinfocompanystat'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    else if(collectionname === 'baseinfocompanypay'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    if(collectionname === 'baseinfocompanyservice'){
      if (typeof retdoc.CreateDate === 'string') {
        retdoc.CreateDate = getdatefromstring(retdoc.CreateDate);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    else if(collectionname === 'baseinfocompanypermit'){
      if (typeof retdoc.StartDate === 'string') {
        retdoc.StartDate = getdatefromstring(retdoc.StartDate);
      }
      if (typeof retdoc.StopDate === 'string') {
        retdoc.StopDate = getdatefromstring(retdoc.StopDate);
      }
      if (typeof retdoc.CertifyDate === 'string') {
        retdoc.CertifyDate = getdatefromstring(retdoc.CertifyDate);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    else if(collectionname === 'baseinfocompanyfare'){
      if (typeof retdoc.FareValidOn === 'string') {
        retdoc.FareValidOn = getdatefromstring(retdoc.FareValidOn);
      }
      if (typeof retdoc.FareValidOff === 'string') {
        retdoc.FareValidOff = getdatefromstring(retdoc.FareValidOff);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);

      retdoc.FareType = getFaretype(retdoc.FareType);
      if(!retdoc.FareType ){
        callbackfn();
        return;
      }
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    else if(collectionname === 'baseinfovehicle'){//待检查
      if (typeof retdoc.CertifyDateA === 'string') {
        retdoc.CertifyDateA =  getdatefromstring(retdoc.CertifyDateA);
      }
      if (typeof retdoc.TransDateStart === 'string') {
        retdoc.TransDateStart = getdatefromstring(retdoc.TransDateStart);
      }
      if (typeof retdoc.TransDateStop === 'string') {
        retdoc.TransDateStop =  getdatefromstring(retdoc.TransDateStop);
      }
      if (typeof retdoc.CertifyDateB === 'string') {
        retdoc.CertifyDateB =  getdatefromstring(retdoc.CertifyDateB);
      }
      if (typeof retdoc.GPSlnstallDate === 'string') {
        retdoc.GPSlnstallDate =  getdatefromstring(retdoc.GPSlnstallDate);
      }
      if (typeof retdoc.GPSInstallDate === 'string') {
        retdoc.GPSInstallDate =  getdatefromstring(retdoc.GPSInstallDate);
      }
      if (typeof retdoc.RegisterDate === 'string') {
        retdoc.RegisterDate =  getdatefromstring(retdoc.RegisterDate);
      }
      if (typeof retdoc.NextFixDate === 'string') {
        retdoc.NextFixDate =  getdatefromstring(retdoc.NextFixDate);
      }
      // retdoc['Commercial-Type'] = 1;

      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      if(!retdoc.GPSInstallDate && !!retdoc.GPSlnstallDate){
        debug(`${collectionname}-->字段GPSInstallDate必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        winston.getlog().error(`${collectionname}-->字段GPSInstallDate必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        retdoc.GPSInstallDate  = retdoc.GPSlnstallDate;
      }

      if(!retdoc['CommercialType']){
        debug(`${collectionname}-->字段CommercialType必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        winston.getlog().error(`${collectionname}-->字段CommercialType必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        retdoc['CommercialType'] = 1;
      }

      if(!retdoc['CertifyDateA']){
        debug(`${collectionname}-->字段CertifyDateA必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        winston.getlog().error(`${collectionname}-->字段CertifyDateA必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        retdoc['CertifyDateA'] = getdatefromstring('2018-03-24');
      }

      if(!retdoc['FareType']){
        debug(`${collectionname}-->字段FareType必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        winston.getlog().error(`${collectionname}-->字段FareType必填,但目前没有,车牌号:${retdoc.VehicleNo}`);
        retdoc['FareType'] = '590c8e423beda6051b5afa26';
      }

      if(!!retdoc.PlateColor){
        const PlateColorMap = {
          '蓝色':'1',
          '黄色':'2',
          '黑色':'3',
          '白色':'4',
          '绿色':'5',
          '其他':'9'
        };
        if(!!PlateColorMap[retdoc.PlateColor]){
          retdoc.PlateColor = PlateColorMap[retdoc.PlateColor];
          if(!retdoc.PlateColor){
            retdoc.PlateColor = '9';
          }
        }

      }

      if(!!retdoc.FuelType){
        const FuelTypeMap = {
          '汽油':'A',
          '柴油':'B',
          '电':'C'
        }
        if(!!FuelTypeMap[retdoc.FuelType]){
          retdoc.FuelType = FuelTypeMap[retdoc.FuelType];
          if(!retdoc.FuelType){
            retdoc.FuelType = 'A';
          }
        }
      }


      if(!!retdoc.CheckState){
        retdoc.CheckState = '0';
      }

      if(!retdoc['PhotoId']){
        retdoc = _.omit(retdoc,['PhotoId']);
      }

      retdoc.FareType = getFaretype(retdoc.FareType);
      if(!retdoc.FareType ){
        callbackfn();
        return;
      }
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
      retdoc = _.omit(retdoc,['Certificate','NextFixDate','GPSIMEI','GPSlnstallDate','Commercial-Type']);
    }
    else if(collectionname === 'baseinfovehicleinsurance'){
      if (typeof retdoc.InsurEff === 'string') {
        retdoc.InsurEff = getdatefromstring(retdoc.InsurEff);
      }
      if (typeof retdoc.InsurExp === 'string') {
        retdoc.InsurExp = getdatefromstring(retdoc.InsurExp);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
    }
    else if(collectionname === 'baseinfovehicletotalmile'){
       retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfodriver'){
      //注意：不能用=>，否则出错，不知道原因
        if (typeof retdoc.DriverBirthday === 'string') {
          retdoc.DriverBirthday = getdatefromstring(retdoc.DriverBirthday);
        }
        if (typeof retdoc.GetDriverLicenseDate === 'string') {
          retdoc.GetDriverLicenseDate = getdatefromstring(retdoc.GetDriverLicenseDate);
        }
        if (typeof retdoc.DriverLicenseOn === 'string') {
          retdoc.DriverLicenseOn = getdatefromstring(retdoc.DriverLicenseOn);
        }
        if (typeof retdoc.DriverLicenseOff === 'string') {
          retdoc.DriverLicenseOff = getdatefromstring(retdoc.DriverLicenseOff);
        }
        if(!retdoc['TaxiDriver']){
          retdoc.TaxiDriver = 0;
        }
        if (typeof retdoc.NetworkCarIssueDate === 'string') {
          retdoc.NetworkCarIssueDate = getdatefromstring(retdoc.NetworkCarIssueDate);
        }
        if (typeof retdoc.GetNetworkCarProofDate === 'string') {
          retdoc.GetNetworkCarProofDate = getdatefromstring(retdoc.GetNetworkCarProofDate);
        }
        if (typeof retdoc.NetworkCarProofOn === 'string') {
          retdoc.NetworkCarProofOn = getdatefromstring(retdoc.NetworkCarProofOn);
        }
        if (typeof retdoc.NetworkCarProofOff === 'string') {
          retdoc.NetworkCarProofOff = getdatefromstring(retdoc.NetworkCarProofOff);
        }
        if (typeof retdoc.RegisterDate === 'string') {
          retdoc.RegisterDate = getdatefromstring(retdoc.RegisterDate);
        }
        if (typeof retdoc.ContractOn === 'string') {
          retdoc.ContractOn = getdatefromstring(retdoc.ContractOn);
        }
        if (typeof retdoc.ContractOff === 'string') {
          retdoc.ContractOff = getdatefromstring(retdoc.ContractOff);
        }
        retdoc.CommercialType = 1;//1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
        retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);

        if(!!retdoc.DriverNation){
          retdoc.DriverNation = 'HA';
        }
        if(!!retdoc.DriverGender){
          retdoc.DriverGender = '1';
        }

        if(retdoc.TaxiDriver){
          retdoc.TaxiDriver = 1;
        }
        else{
          retdoc.TaxiDriver = 0;
        }

        //  1、接口baseInfoDriver
        //  DriverType 准驾车型 不可为空，不可为"0"
        //  DriverGender、PassengerGender 性别字段 有效值范围，0、1、2、5、6、9
        //  CommercialType 取值范围 1、2、3
        if(_.findIndex(['A1','A2','A3','B1','B2','C1','C2','C3','C4','C5','D','E','F','M','N','P'],retdoc.DriverType) === -1){
          debug(`${collectionname}-->字段DriverType非法,但目前是:${retdoc.DriverType}`);
          retdoc.DriverType = 'C1';
        }

        if(_.findIndex(['0','1','2','5','6','9'],retdoc.DriverGender) === -1){
          debug(`${collectionname}-->字段DriverGender非法,但目前是:${retdoc.DriverGender}`);
          if(retdoc.DriverGender === '男'){
            retdoc.DriverGender = '1';
          }
          else if(retdoc.DriverGender === '女'){
            retdoc.DriverGender = '2';
          }
          else{
            retdoc.DriverGender = '0';
          }
        }

        retdoc = _.omit(retdoc,['LicensePhotoldURL','DriverName','DriverNationality',
        'DriverMaritalStatus','DriverLanguageLevel','DriverEducation','DriverCensus',
        'DriverAddress','PhotoIdURL','LicensePhotoIdURL','FullTimeDriver',
        'InDriverBlacklist','EmergencyContact','EmergencyContactPhone','EmergencyContactAddress','Licenseld']);

        if(!retdoc['GetDriverLicenseDate']){
          debug(`${collectionname}-->字段GetDriverLicenseDate必填,但目前没有,驾驶证号:${retdoc.LicenseId}`);
          retdoc['GetDriverLicenseDate'] = getdatefromstring('2018-03-24');
        }

        if(!retdoc['LicensePhotoId']){
          retdoc = _.omit(retdoc,['LicensePhotoId']);
        }
        if(!retdoc['PhotoId']){
          retdoc = _.omit(retdoc,['PhotoId']);
        }
      }
    else if(collectionname === 'baseinfodrivereducate'){
      if (typeof retdoc.CourseDate === 'string') {
        retdoc.CourseDate = getdatefromstring(retdoc.CourseDate);
      }
      retdoc.UpdateTime = gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfodriverapp'){
      retdoc.MapType =  2;
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);

      retdoc = _.omit(retdoc,['Companyld']);
      if(!retdoc.LicenseId){
        retdoc.LicenseId = '1234';
        debug(`${collectionname}-->字段LicenseId必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段LicenseId必填,但目前没有`);
      }

      if(!retdoc.Address){
        retdoc.Address = 341181;
        debug(`${collectionname}-->字段Address必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段Address必填,但目前没有`);
      }

      if(retdoc.NetType !== 1 && retdoc.NetType !== 2 && retdoc.NetType !== 3 && retdoc.NetType !== 4){
        retdoc.NetType = 1;
        debug(`${collectionname}-->字段NetType非法,目前是:${retdoc.NetType}`);
        winston.getlog().error(`${collectionname}-->字段NetType非法,目前是:${retdoc.NetType}`);
      }
    }
    // else if(collectionname === 'baseinfodriverstat'){
    //   retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    // }
    else if(collectionname === 'baseinfopassenger'){
      if (typeof retdoc.RegisterDate === 'string') {
        retdoc.RegisterDate = getdatefromstring(retdoc.UpdateTime);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);

      // 2、接口baseInfoPassenger
      // PassengerGender 性别字段 有效值范围，0、1、2、5、6、9
      if(_.findIndex(['0','1','2','5','6','9'],retdoc.PassengerGender) === -1){
        debug(`${collectionname}-->字段DriverGender非法,但目前是:${retdoc.PassengerGender}`);
        if(retdoc.PassengerGender === '男'){
          retdoc.PassengerGender = '1';
        }
        else if(retdoc.PassengerGender === '女'){
          retdoc.PassengerGender = '2';
        }
        else{
          retdoc.PassengerGender = '0';
        }
      }

    }
    else if(collectionname === 'ordercreate'){
      if (typeof retdoc.DepartTime === 'string') {
        if(retdoc.DepartTime.length < 12){//"2018-01-23"
          retdoc.DepartTime = gettimefromstring(retdoc.OrderTime);
        }
        else{
          retdoc.DepartTime = gettimefromstring(retdoc.DepartTime);
        }
      }
      if (typeof retdoc.OrderTime === 'string') {
        retdoc.OrderTime = gettimefromstring(retdoc.OrderTime);
      }
      if(!!retdoc.DepLongitude){
        retdoc.DepLongitude = getgeonumberfloat6(retdoc.DepLongitude);
      }
      if(!!retdoc.DepLatitude){
        retdoc.DepLatitude = getgeonumberfloat6(retdoc.DepLatitude);
      }
      if(!!retdoc.DestLongitude){
        retdoc.DestLongitude = getgeonumberfloat6(retdoc.DestLongitude);
      }
      if(!!retdoc.DestLatitude){
        retdoc.DestLatitude = getgeonumberfloat6(retdoc.DestLatitude);
      }
      retdoc.Encrypt =  2;
      if(!retdoc.Address){
        retdoc.Address = 341181;
        debug(`${collectionname}-->字段Address必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段Address必填,但目前没有`);
      }
      retdoc.Address = getAddress(retdoc.Address);
      retdoc.FareType = getFaretype(retdoc.FareType);
      if(!retdoc.FareType ){
        callbackfn();
        return;
      }
      // let Platform_orderCreateSchema= new Schema({
      //   // CompanyId:String,	//	是	字符型	V32	公司标识
      //   Address:Number,//	是	数字型	F6	发起地行政区划代码	见 GB/T 2260
      //   OrderId:String,	//	是	字符型	V64	订单编号
      //   DepartTime:String,//	是	数字型	F14	预计用车时间	YYYYMMDDhhmmss
      //   OrderTime:String,//	是	数字型F14	订单发起时间 YYYYMMDDhhmmss
      //   PassengerNote:String,	//	否	字符型V128	乘客备注
      //   Departure:String,	//是字符型V128 预计出发地点详细地址
      //   DepLongitude:Number,//	是	数字型V10	预计出发地点经度	单位 :1 祷 10-6度
      //   DepLatitude:Number,//	是	数字型V10	预计出发地点纬度	单位:1铃 10-6度
      //   Destination:String,	//	是	字符型V128	预计目的地
      //   DestLongitude:Number,//	是	数字型VI0	预计目的地经度	单位 :1铃 10-6度
      //   DestLatitude:Number,//	是	数字型V10	预计目的地纬度	单位 :1怜 10-6度
      //   Encrypt:Number,//是数字型F1坐标加密标识1:GCJ-02 测绘局标准2 :WGS84 GPS 标准3 :BD-09 百度标准4 :CGCS2000 北斗标准O .其他
      //   FareType:String,	//	是	字符型V16	运价类型编码
      //
      //   isuploaded:{ type: Number, default: 0 },//是否上传
      // });
    }
    else if(collectionname === 'ordermatch'){
      if (typeof retdoc.DistributeTime === 'string') {
        retdoc.DistributeTime = gettimefromstring(retdoc.DistributeTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc.Encrypt =  2;
      if(!retdoc.Address){
        retdoc.Address = 341181;
        debug(`${collectionname}-->字段Address必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段Address必填,但目前没有`);
      }
      retdoc.Address = getAddress(retdoc.Address);
      if(!retdoc.DriverPhone){
        retdoc.DriverPhone = '1234';
        debug(`${collectionname}-->字段DriverPhone必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段DriverPhone必填,但目前没有`);
      }
      if(!retdoc.VehicleNo){
        retdoc.VehicleNo = '1234';
        debug(`${collectionname}-->字段VehicleNo必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段VehicleNo必填,但目前没有`);
      }
    }
    else if(collectionname === 'ordercancel'){
      if (typeof retdoc.OrderTime === 'string') {
        retdoc.OrderTime = gettimefromstring(retdoc.OrderTime);
      }
      if (typeof retdoc.CancelTime === 'string') {
        retdoc.CancelTime = gettimefromstring(retdoc.CancelTime);
      }

      if(!retdoc.Address){
        retdoc.Address = 341181;
        debug(`${collectionname}-->字段Address必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段Address必填,但目前没有`);
      }
      retdoc.Address = getAddress(retdoc.Address);
    }
    else if(collectionname === 'operatelogin'){
      if (typeof retdoc.LoginTime === 'string') {
        retdoc.LoginTime = gettimefromstring(retdoc.LoginTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatelogout'){
      if (typeof retdoc.LogoutTime === 'string') {
        retdoc.LogoutTime = gettimefromstring(retdoc.LogoutTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatedepart'){
      if (typeof retdoc.DepTime === 'string') {
        retdoc.DepTime = gettimefromstring(retdoc.DepTime);
      }
      if(!!retdoc.DepLongitude){
        retdoc.DepLongitude = getgeonumberfloat6(retdoc.DepLongitude);
      }
      if(!!retdoc.DepLatitude){
        retdoc.DepLatitude = getgeonumberfloat6(retdoc.DepLatitude);
      }
      retdoc.Encrypt =  2;
      retdoc = _.omit(retdoc,['WaitMile','WaitTime']);
      retdoc.FareType = getFaretype(retdoc.FareType);
      if(!retdoc.FareType ){
        callbackfn();
        return;
      }
    }
    else if(collectionname === 'operatearrive'){
      if (typeof retdoc.DestTime === 'string') {
        retdoc.DestTime = gettimefromstring(retdoc.DestTime);
      }
      if(!!retdoc.DestLongitude){
        retdoc.DestLongitude = getgeonumberfloat6(retdoc.DestLongitude);
      }
      if(!!retdoc.DestLatitude ){
        retdoc.DestLatitude = getgeonumberfloat6(retdoc.DestLatitude);
      }
      retdoc.Encrypt =  2;
      retdoc.DriveTime = parseInt(retdoc.DriveTime);
    }
    else if(collectionname === 'operatepay'){
      if (typeof retdoc.BookDepTime === 'string') {
        retdoc.BookDepTime = gettimefromstring(retdoc.BookDepTime);
      }
      if (typeof retdoc.DepTime === 'string') {
        retdoc.DepTime = gettimefromstring(retdoc.DepTime);
      }
      if (typeof retdoc.DestTime === 'string') {
        retdoc.DestTime = gettimefromstring(retdoc.DestTime);
      }
      if (typeof retdoc.PayTime === 'string') {
        retdoc.PayTime = gettimefromstring(retdoc.PayTime);
      }
      if (typeof retdoc.OrderMatchTime === 'string') {
        retdoc.OrderMatchTime = gettimefromstring(retdoc.OrderMatchTime);
      }
      if(!!retdoc.DepLongitude ){
        retdoc.DepLongitude = getgeonumberfloat6(retdoc.DepLongitude);
      }
      if(!!retdoc.DepLatitude){
        retdoc.DepLatitude = getgeonumberfloat6(retdoc.DepLatitude);
      }
      if(!!retdoc.DestLongitude){
        retdoc.DestLongitude = getgeonumberfloat6(retdoc.DestLongitude);
      }
      if(!!retdoc.DestLatitude){
        retdoc.DestLatitude = getgeonumberfloat6(retdoc.DestLatitude);
      }
      retdoc.Encrypt =  2;
      retdoc.FareType = getFaretype(retdoc.FareType);
      if(!retdoc.FareType ){
        callbackfn();
        return;
      }
      retdoc = _.omit(retdoc,['DriverName','WaitTime','DepArea','DestArea','BookModel',
    'Model','WaitMile','Price','CashPrice','LineName','LinePrice','PosName','PosPrice','BenfitPrice',
  'BookTip','PassengerTip','PeakUpPrice','NightUpPrice','PayTime']);

      // if(!retdoc.OnArea){
      //   retdoc.OnArea = 341181;
      //   debug(`${collectionname}-->字段OnArea必填,但目前没有`);
      //   winston.getlog().error(`${collectionname}-->字段OnArea必填,但目前没有`);
      // }
      if(!retdoc.DestTime){
        retdoc.DestTime = retdoc.DepTime;
        debug(`${collectionname}-->字段DestTime必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段DestTime必填,但目前没有`);
      }
      if(!retdoc.OnArea){
        retdoc.OnArea = 341181;
        debug(`${collectionname}-->字段OnArea必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段OnArea必填,但目前没有`);
      }
      retdoc.OnArea = getAddress(retdoc.OnArea);

      retdoc.DriveTime = parseInt(retdoc.DriveTime);

    }
    else if(collectionname === 'baseinfodriverstat'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);

      retdoc = _.omit(retdoc,['TafficViolationCount']);
      if(!retdoc.TrafficViolationCount){
        retdoc.TrafficViolationCount = 0;
        debug(`${collectionname}-->字段TrafficViolationCount必填,但目前没有`);
        winston.getlog().error(`${collectionname}-->字段TrafficViolationCount必填,但目前没有`);
      }
    }
    else if(collectionname === 'positiondriver'){

      // let Platform_positionDriverSchema= new Schema({
      //   // CompanyId:String,		//	是	字符型	V32	网约车公司标识
      //   LicenseId:String,		//	是	字符型	V32	网约车公司标识	是	字符型	V32		机动车驾驶证号		驾驶员报备地行政区划
      //   DriverRegionCode:Number,	//	是	数字型	F6		行政区划代码	代码，地市级，应符合GB/T2260
      //   VehicleNo:String,		//	是	字符型	V32	网约车公司标识	是	字符型 V32		车辆号牌
      //   PositionTime:String,	//	是	数字型	V14		定位时间	umxtlme
      //   Longitude:Number,	//	是	数字型	V10		经度	单位 :1祷 10-6 度
      //   Latitude:Number,	//	是	数字型	V10		纬度	单位 :1铃 10-6 度 1:GC]-02 测绘局标准
      //   Encrypt:Number,	//	否	数字型	V10		坐标加密标识	2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准0:其他
      //   Direction:Number,	//	否	数字型	V10		方向角	0-359 ，顺时针方向
      //   Elevation:Number,	//	否	数字型	V10		海拔高度	单位:米
      //   Speed:Number,	//	否	数字型	V10		瞬时速度	单位 :公里每小时(km/h)
      //   BizStatus:Number,	//	否	数字型	V10		营运状态	1:载客、2.接单、3 :空驶4.停运
      //   OrderId:String,		//	是	字符型	V64		订单编号
      //
      //   isuploaded:{ type: Number, default: 0 },//是否上传
      // });
      // if (typeof retdoc.PositionTime === 'string') {
      //   retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      // }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc = _.omit(retdoc,['Speed','Direction','Elevation','Mileage',
      'WarnStatus','VehStatus','BizStatus']);
      retdoc.Encrypt = 2;
      if(!retdoc['DriverRegionCode']){
        debug(`${collectionname}-->字段DriverRegionCode必填,但目前没有,车牌号:${retdoc.VehicleNo},定位时间:${retdoc.PositionTime}`);
        winston.getlog().error(`${collectionname}-->字段DriverRegionCode必填,但目前没有,车牌号:${retdoc.VehicleNo},定位时间:${retdoc.PositionTime}`);
        retdoc['DriverRegionCode'] = 340000;
      }
      retdoc.PositionTime =  moment(retdoc.PositionTime).unix();
      if(retdoc.OrderId === '0'){//不传
        callbackfn();
        return;
      }
    }
    else if(collectionname === 'positionvehicle'){
      // if (typeof retdoc.PositionTime === 'string') {
      //   retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      // }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc = _.omit(retdoc,['Speed','Direction','Elevation','Encrypt','BizStatus']);
      retdoc.Encrypt = 2;
      retdoc.PositionTime =  moment(retdoc.PositionTime).unix();
    }
    else if(collectionname === 'ratedpassenger'){
      if (typeof retdoc.EvaluateTime === 'string') {
        retdoc.EvaluateTime = gettimefromstring(retdoc.EvaluateTime);
      }
    }
    else if(collectionname === 'ratedpassengercomplaint'){
      if (typeof retdoc.ComplaintTime === 'string') {
        retdoc.ComplaintTime = gettimefromstring(retdoc.ComplaintTime);
      }
    }
    else if(collectionname === 'rateddriverpunish'){
      if (typeof retdoc.PunishTime === 'string') {
        retdoc.PunishTime = gettimefromstring(retdoc.PunishTime);
      }
    }
    else if(collectionname === 'rateddriver'){
      if (typeof retdoc.TestDate === 'string') {
        retdoc.TestDate = getdatefromstring(retdoc.TestDate);
      }
    }
    callbackfn(retdoc);
    return;
  }
  callbackfn();

}

module.exports = getplatformdata;
