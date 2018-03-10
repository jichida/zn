const moment = require('moment');
const _ = require('lodash');
const config = require('../config.js');
const debug = require('debug')("uploadsrv:processdata");
const winston = require('../log/index.js');

const gettimefromstring = (timestring)=>{
  let curtime = moment(timestring).format('YYYYMMDDHHmmss');
  return parseInt(curtime);
}
const getdatefromstring = (timestring)=>{
  let curtime = moment(timestring).format('YYYYMMDD');
  return parseInt(curtime);
}
const getgeonumberfloat6 = (lntlngnumber)=>{
  const retv = _.toNumber(lntlngnumber.toFixed(6))*1000000;
  return parseInt(retv);
}


const getplatformdata = (actionname,collectionname,doc)=>{
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
      retdoc['Commercial-Type'] = 1;
      retdoc['CommercialType'] = 1;
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      if(!retdoc.GPSInstallDate && !!retdoc.GPSlnstallDate){
        retdoc.GPSInstallDate  = retdoc.GPSlnstallDate;
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

        if(!!PlateColorMap[retdoc.VehicleColor]){
          retdoc.VehicleColor = PlateColorMap[retdoc.VehicleColor];
          if(!retdoc.VehicleColor){
            retdoc.VehicleColor = '9';
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


      // if(actionname !== 'upload'){
      //   retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
      // }
      retdoc = _.omit(retdoc,['Certificate','NextFixDate','GPSIMEI','GPSlnstallDate']);
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
        if(!retdoc.hasOwnProperty('TaxiDriver')){
          retdoc.TaxiDriver = false;
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
        if(!retdoc.hasOwnProperty('FullTimeDriver')){
          retdoc.FullTimeDriver = false;
        }
        if(!retdoc.hasOwnProperty('InDriverBlacklist')){
          retdoc.InDriverBlacklist = false;
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
        if(!!retdoc.TaxiDriver){
          if(retdoc.TaxiDriver){
            retdoc.TaxiDriver = 1;
          }
          else{
            retdoc.TaxiDriver = 0;
          }
        }
        retdoc = _.omit(retdoc,['LicensePhotoldURL','DriverName','DriverNationality',
        'DriverMaritalStatus','DriverLanguageLevel','DriverEducation','DriverCensus',
        'DriverAddress','PhotoIdURL','LicensePhotoIdURL','DriverType','FullTimeDriver',
        'InDriverBlacklist','EmergencyContact','EmergencyContactPhone','EmergencyContactAddress','Licenseld']);

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
    }
    // else if(collectionname === 'baseinfodriverstat'){
    //   retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    // }
    else if(collectionname === 'baseinfopassenger'){
      if (typeof retdoc.RegisterDate === 'string') {
        retdoc.RegisterDate = getdatefromstring(retdoc.UpdateTime);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'ordercreate'){
      if (typeof retdoc.DepartTime === 'string') {
        retdoc.DepartTime = gettimefromstring(retdoc.DepartTime);
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
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc = _.omit(retdoc,['Speed','Direction','Elevation','Mileage','Encrypt',
      'WarnStatus','VehStatus','BizStatus']);
    }
    else if(collectionname === 'positionvehicle'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
      if(!!retdoc.Longitude){
        retdoc.Longitude = getgeonumberfloat6(retdoc.Longitude);
      }
      if(!!retdoc.Latitude){
        retdoc.Latitude = getgeonumberfloat6(retdoc.Latitude);
      }
      retdoc = _.omit(retdoc,['Speed','Direction','Elevation','Encrypt','BizStatus']);
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
    return retdoc;
  }

}

module.exports = getplatformdata;
