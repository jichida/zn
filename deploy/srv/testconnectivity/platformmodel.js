const dbs = require('../src/db/index');
const _ = require('lodash');
const testurls = [
    'baseinfocompany',//0
    'baseinfocompanystat',//1
    'baseinfocompanypay',//2
    'baseinfocompanyservice',//3
    'baseinfocompanypermit',//4
    'baseinfocompanyfare',//5
    'baseinfovehicle',//6《--baseInfoVehicle
    'baseinfovehicleinsurance',//7
    'baseinfovehicletotalmile',//8
    'baseinfodriver',//9《--baseInfoDriver
    'baseinfodrivereducate',//10
    'baseinfodriverapp',//11
    'baseinfodriverstat',//12
    'baseinfopassenger',//13
    'ordercreate',//14
    'ordermatch',//15
    'ordercancel',//16
    'operatelogin',//17
    'operatelogout',//18
    'operatedepart',//19
    'operatearrive',//20
    'operatepay',//21《--operatePay
    'positiondriver',//22
    'positionvehicle',//23《---positionVehicle 《----VehicleRegionCode
    'ratedpassenger',//24
    'ratedpassengercomplaint',//25
    'rateddriverpunish',//26
    'rateddriver'//27
];

const getmodels = ()=>{
  const dbslist = [];
  _.map(testurls,(name)=>{
    dbslist.push(dbs[name]);
  });
  return dbslist;
}

const hasphoto = (name)=>{
  return name === 'baseinfocompany' || name === 'baseinfodriver' || name === 'baseinfovehicle';
}
const getmodelslist = (isbat)=>{
  if(isbat === null){
    return getmodels();
  }
  const dbslist = [];
  _.map(testurls,(name)=>{
    const isphoto = hasphoto(name);
    if(isbat && !isphoto){
      dbslist.push(dbs[name]);
    }
    if(!isbat && isphoto){
      dbslist.push(dbs[name]);
    }
  });
  return dbslist;
}

module.exports = getmodelslist;
