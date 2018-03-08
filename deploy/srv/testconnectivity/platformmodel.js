const dbs = require('../src/db/index');
const _ = require('lodash');
const testurls = [
    // 'baseinfocompany',
    // 'baseinfocompanystat',
    // 'baseinfocompanypay',
    // 'baseinfocompanyservice',
    'baseinfocompanypermit',
    // 'baseinfocompanyfare',
    'baseinfovehicle',
    // 'baseinfovehicleinsurance',
    // 'baseinfovehicletotalmile',
    'baseinfodriver',
    'baseinfodrivereducate',
    'baseinfodriverapp',
    'baseinfodriverstat',
    // 'baseinfopassenger',
    'ordercreate',
    'ordermatch',
    'ordercancel',
    'operatelogin',
    'operatelogout',
    'operatedepart',
    'operatearrive',
    'operatepay',
    'positiondriver',
    'positionvehicle',
    'ratedpassenger',
    // 'ratedpassengercomplaint',
    // 'rateddriverpunish',
    // 'rateddriver'
];

const getmodels = ()=>{
  const dbslist = [];
  _.map(testurls,(name)=>{
    dbslist.push(dbs[name]);
  });
  return dbslist;
}

module.exports = getmodels;
