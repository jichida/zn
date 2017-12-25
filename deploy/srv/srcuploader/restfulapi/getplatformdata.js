const moment = require('moment');
const _ = require('lodash');
const config = require('../config.js');

const gettimefromstring = (timestring)=>{
  let curtime = moment(timestring).format('YYYYMMDDHHmmss');
  return parseInt(curtime);
}

const getplatformdata = (actionname,collectionname,doc)=>{
  let retdoc = doc;
  retdoc = _.omit(retdoc,['_id','__v']);
  console.log(`retdoc==>${JSON.stringify(retdoc)}`);
  console.log(`actionname==>${actionname}`);
  console.log(`collectionname==>${collectionname}`);

  if(actionname === 'save' || actionname === 'findByIdAndUpdate'){
    if(collectionname === 'baseinfocompany'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      console.log(`retdoc==>${retdoc.UpdateTime}`);
      retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
    }
    else if(collectionname === 'baseinfocompanystat'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      retdoc.CompanyId = config.CompanyId;
      retdoc.Flag = actionname === 'save' ?1:2;//1新增，2更新，3删除
    }
    else if(collectionname === 'baseinfocompanypay'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfocompanyservice'){
      if (typeof retdoc.CreateDate === 'string') {
        retdoc.CreateDate = gettimefromstring(retdoc.CreateDate);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfocompanypermit'){
      if (typeof retdoc.StartDate === 'string') {
        retdoc.StartDate = gettimefromstring(retdoc.StartDate);
      }
      if (typeof this.StopDate === 'string') {
        retdoc.StopDate = gettimefromstring(retdoc.StopDate);
      }
      if (typeof this.CertifyDate === 'string') {
        retdoc.CertifyDate = gettimefromstring(retdoc.CertifyDate);
      }
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfocompanyfare'){
      if (typeof retdoc.FareValidOn === 'string') {
        retdoc.FareValidOn = gettimefromstring(retdoc.FareValidOn);
      }
      if (typeof retdoc.FareValidOff === 'string') {
        retdoc.FareValidOff = gettimefromstring(retdoc.FareValidOff);
      }
      // retdoc.FareValidOn = util.gettimeformat(retdoc.FareValidOn);
      // retdoc.FareValidOff = util.gettimeformat(retdoc.FareValidOff);
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfovehicle'){
      if (typeof retdoc.CertifyDateA === 'string') {
        retdoc.CertifyDateA =  gettimefromstring(retdoc.CertifyDateA);
      }
      if (typeof retdoc.TransDateStart === 'string') {
        retdoc.TransDateStart = gettimefromstring(retdoc.TransDateStart);
      }
      if (typeof retdoc.TransDateStop === 'string') {
        retdoc.TransDateStop =  gettimefromstring(retdoc.TransDateStop);
      }
      if (typeof retdoc.CertifyDateB === 'string') {
        retdoc.CertifyDateB = new Date(Date.parse(retdoc.CertifyDateB));
      }
      if (typeof retdoc.GPSlnstallDate === 'string') {
        retdoc.GPSlnstallDate = new Date(Date.parse(retdoc.GPSlnstallDate));
      }
      retdoc['Commercial-Type'] = 1;
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfoVehicleInsurance'){
      if (typeof retdoc.InsurEff === 'string') {
        retdoc.InsurEff = gettimefromstring(retdoc.InsurEff);
      }
      if (typeof this.InsurExp === 'string') {
        retdoc.InsurExp = gettimefromstring(retdoc.InsurExp);
      }
      retdoc.UpdateTime = gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfovehicletotalmile'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfodriver'){
      //注意：不能用=>，否则出错，不知道原因
        if (typeof retdoc.DriverBirthday === 'string') {
          retdoc.DriverBirthday = gettimefromstring(retdoc.DriverBirthday);
        }
        if (typeof retdoc.GetDriverLicenseDate === 'string') {
          retdoc.GetDriverLicenseDate = gettimefromstring(retdoc.GetDriverLicenseDate);
        }
        if (typeof retdoc.DriverLicenseOn === 'string') {
          retdoc.DriverLicenseOn = gettimefromstring(retdoc.DriverLicenseOn);
        }
        if (typeof retdoc.DriverLicenseOff === 'string') {
          retdoc.DriverLicenseOff = gettimefromstring(retdoc.DriverLicenseOff);
        }
        if(!retdoc.hasOwnProperty('TaxiDriver')){
          retdoc.TaxiDriver = false;
        }
        if (typeof retdoc.NetworkCarIssueDate === 'string') {
          retdoc.NetworkCarIssueDate = gettimefromstring(retdoc.NetworkCarIssueDate);
        }
        if (typeof retdoc.GetNetworkCarProofDate === 'string') {
          retdoc.GetNetworkCarProofDate = gettimefromstring(retdoc.GetNetworkCarProofDate);
        }
        if (typeof retdoc.NetworkCarProofOn === 'string') {
          retdoc.NetworkCarProofOn = gettimefromstring(retdoc.NetworkCarProofOn);
        }
        if (typeof retdoc.NetworkCarProofOff === 'string') {
          retdoc.NetworkCarProofOff = gettimefromstring(retdoc.NetworkCarProofOff);
        }
        if (typeof retdoc.RegisterDate === 'string') {
          retdoc.RegisterDate = gettimefromstring(retdoc.RegisterDate);
        }
        if(!retdoc.hasOwnProperty('FullTimeDriver')){
          retdoc.FullTimeDriver = false;
        }
        if(!retdoc.hasOwnProperty('InDriverBlacklist')){
          retdoc.InDriverBlacklist = false;
        }
        if (typeof retdoc.ContractOn === 'string') {
          retdoc.ContractOn = gettimefromstring(retdoc.ContractOn);
        }
        if (typeof retdoc.ContractOff === 'string') {
          retdoc.ContractOff = gettimefromstring(retdoc.ContractOff);
        }
        retdoc.CommercialType = 1;//1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
        retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
      }
    else if(collectionname === 'baseinfodrivereducate'){
      if (typeof retdoc.CourseDate === 'string') {
        retdoc.CourseDate = gettimefromstring(retdoc.CourseDate);
      }
      retdoc.UpdateTime = gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfodriverapp'){
      retdoc.MapType =  2;
      retdoc.UpdateTime = gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfodriverstat'){
      retdoc.UpdateTime =  gettimefromstring(retdoc.UpdateTime);
    }
    else if(collectionname === 'baseinfopassenger'){
      if (typeof retdoc.RegisterDate === 'string') {
        retdoc.RegisterDate = gettimefromstring(retdoc.UpdateTime);
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
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'ordermatch'){
      if (typeof retdoc.DistributeTime === 'string') {
        retdoc.DistributeTime = gettimefromstring(retdoc.DistributeTime);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'ordercancel'){
      if (typeof retdoc.OrderTime === 'string') {
        retdoc.OrderTime = gettimefromstring(retdoc.OrderTime);
      }
      if (typeof retdoc.CancelTime === 'string') {
        retdoc.CancelTime = gettimefromstring(retdoc.CancelTime);
      }
    }
    else if(collectionname === 'operatelogin'){
      if (typeof retdoc.LoginTime === 'string') {
        retdoc.LoginTime = gettimefromstring(retdoc.LoginTime);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatelogout'){
      if (typeof retdoc.LogoutTime === 'string') {
        retdoc.LogoutTime = gettimefromstring(retdoc.LogoutTime);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatedepart'){
      if (typeof retdoc.DepTime === 'string') {
        retdoc.DepTime = gettimefromstring(retdoc.DepTime);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatearrive'){
      if (typeof retdoc.DestTime === 'string') {
        retdoc.DestTime = gettimefromstring(retdoc.DestTime);
      }
      retdoc.Encrypt =  2;
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
      if (typeof this.PayTime === 'string') {
        retdoc.PayTime = gettimefromstring(retdoc.PayTime);
      }
      if (typeof retdoc.OrderMatchTime === 'string') {
        retdoc.OrderMatchTime = gettimefromstring(retdoc.OrderMatchTime);
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'baseinfodriverstat'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
    }
    else if(collectionname === 'positiondriver'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
    }
    else if(collectionname === 'positionvehicle'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = gettimefromstring(retdoc.PositionTime);
      }
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
        retdoc.TestDate = gettimefromstring(retdoc.TestDate);
      }
    }
    return retdoc;
  }

}

module.exports = getplatformdata;
