const mongoose     = require('mongoose');
const _ = require('lodash');
const DBModels = require('../../db/models.js');
const xlsx = require('node-xlsx');
const async = require('async');
const saveDriverCar = require('../../handler/driver/driverandcar.js');

// {
// 	Platform_baseInfoDriver: {
// 		DriverName: '王小庆',
// 		DriverPhone: '15961125167',
// 		DriverGender: '男',
// 		DriverBirthday: '1979-09-10',
// 		DriverNationality: '中华人民共和国',
// 		DriverNation: '汉',
// 		DriverMaritalStatus: '已婚',
// 		DriverLanguageLevel: '国家六级',
// 		DriverEducation: '大学本科',
// 		DriverCensus: '天长市公安局',
// 		DriverAddress: '安徽省天长市经济开发区石梁镇十八集社区裘庄队12号',
// 		DriverContactAddress: '南京市江宁区天兴花园78栋丙单元701',
// 		LicenseId: '341122197710113611',
// 		DriverType: 'C1',
// 		GetDriverLicenseDate: '1990-09-02',
// 		DriverLicenseOn: '1990-09-12',
// 		DriverLicenseOff: '2018-09-12',
// 		TaxiDriver: '否',
// 		CertificateNo: '153399555223698844',
// 		NetworkCarIssueOrganization: '天长市某某发证处',
// 		NetworkCarIssueDate: '2017-01-02',
// 		GetNetworkCarProofDate: '2018-02-01',
// 		NetworkCarProofOn: '2016-02-21',
// 		NetworkCarProofOff: '2018-02-21',
// 		RegisterDate: '2019-03-12',
// 		FullTimeDriver: '是',
// 		InDriverBlacklist: '否',
// 		CommercialType: '网络预约出租汽车',
// 		ContractCompany: '某某公司',
// 		ContractOn: '2018-02-12',
// 		ContractOff: '2019-02-12',
// 		EmergencyContact: '王小庆',
// 		EmergencyContactPhone: '15961125167',
// 		EmergencyContactAddress: '天长城东街道'
// 	},
// 	Platform_baseInfoVehicle: {
// 		Address: '320221',
// 		VehicleNo: '苏HWT087',
// 		PlateColor: '黑色',
// 		Seats: '6',
// 		Brand: '宝马',
// 		Model: 'S3',
// 		VehicleType: '小型车',
// 		OwnerName: '中南客运',
// 		VehicleColor: '黑色',
// 		CommercialType: '网络预约出租汽车',
// 		EngineId: '1533284',
// 		VIN: 'LHGCM462452032646',
// 		CertifyDateA: '2021-09-02',
// 		FuelType: '汽油',
// 		EngineDisplace: '5',
// 		Certificate: 'wyc201711140002',
// 		TransAgency: '滁州市运管局',
// 		TransArea: '滁州天长',
// 		TransDateStart: '2016-02-21',
// 		TransDateStop: '2018-02-12',
// 		CertifyDateB: '2018-02-09',
// 		FixState: '未检修',
// 		NextFixDate: '2019-09-02',
// 		CheckState: '已审',
// 		FeePrintId: '123456789',
// 		GPSBrand: '北斗',
// 		GPSModel: 'DJ058196',
// 		GPSIMEI: '12385641252',
// 		GPSlnstallDate: '2016-02-01',
// 		RegisterDate: '2019-02-12'
// 	},
// 	username: '15961125110',
// 	registertype: '快车',
// 	idcard: '320421197909101357',
// 	bankname: '中国银行',
// 	bankaccount: '6225885106036673',
// 	huji: '江苏省',
// 	balance: '1000'
// }
const getdrivers = (listdrivers)=>{
  let newlistdrivers = [];
  _.map(listdrivers,(driver,index)=>{
    if(index > 0){
      let newdriver = _.clone(driver);
      newdriver.Platform_baseInfoDriver.TaxiDriver = false;
      newdriver.Platform_baseInfoDriver.FullTimeDriver = false;
      newdriver.Platform_baseInfoDriver.CommercialType = 0;
      newdriver.Platform_baseInfoDriver.InDriverBlacklist = false;
      try{
        newdriver.Platform_baseInfoVehicle.Address = parseInt(newdriver.Platform_baseInfoVehicle.Address);
      }
      catch(e){
        console.log(e)
      }
      // try{
      //   // _.set(newdriver.balance,parseInt(driver.balance),0);
      // }
      // catch(e){
      //   console.log(e)
      // }
      newdriver.balance = 0;
      newdriver.Platform_baseInfoVehicle.Seats = 6;
      newdriver.Platform_baseInfoVehicle.CommercialType = 0;

      if(!newdriver.registertype){
        newdriver.registertype = '快车';
      }
      if(!newdriver.idcard){
        newdriver.idcard = '';
      }
      if(!newdriver.bankname){
        newdriver.bankname = '';
      }
      if(!newdriver.bankaccount){
        newdriver.bankaccount = '';
      }
      if(!newdriver.huji){
        newdriver.huji = '';
      }

      newlistdrivers.push(newdriver);
    }
  });

  return newlistdrivers;
}

const importexcel = (excelfilepath,callbackfn)=>{
  console.log(`开始导入excel:${excelfilepath}`);
  const obj = xlsx.parse(excelfilepath);
  console.log(JSON.stringify(obj));
  let listdrivers = [];
  let resultkey = [];
  _.map(obj,(v)=>{
    _.map(v.data,(dataarray)=>{
      if(resultkey.length === 0){
        resultkey = dataarray;
      }
      else{
        let record = {
          Platform_baseInfoDriver:{

          },
          Platform_baseInfoVehicle:{

          }
        };
        _.map(dataarray,(v,index)=>{
          const key = resultkey[index];
          _.set(record,key,v);
        });
        listdrivers.push(record);
      }
    });
  });

  console.log(listdrivers);
  const newlistdrivers = getdrivers(listdrivers);

  let asyncgetidsfnsz = [];
  _.map(newlistdrivers,(driverinfo)=>{
    const username = _.get(driverinfo,'username');
    const fn = (callbackfn)=>{
      const dbPrevUserDriverModel = DBModels.UserDriverModel;
      dbPrevUserDriverModel.findOneAndUpdate({username},{$set:driverinfo},{new:true,upsert:true},(err,newdriverinfo)=>{
        callbackfn(err,newdriverinfo);
      });
    }
    asyncgetidsfnsz.push(fn);
  });

  async.parallel(asyncgetidsfnsz,(err,resultlist)=>{
    if(!err){
      _.map(resultlist,(newdriverinfo)=>{
        let retdoc = newdriverinfo.toJSON();
        let creatorid = retdoc._id;
        if(typeof creatorid === 'string'){
          creatorid =  mongoose.Types.ObjectId(creatorid);
        }
        saveDriverCar.presave_driver(retdoc,creatorid,(err,result)=>{
          const dbUserDriverModel = DBModels.UserDriverModel;
          dbUserDriverModel.findOneAndUpdate({_id:creatorid},{$set:result},(err,newdriverinfo)=>{

          });
        });
      });
      callbackfn({
        result:'OK',
        resultstring:`成功导入${resultlist.length}条`,
      });
    }
    else{
      callbackfn({
        result:'Error',
        resultstring:`导入失败,失败原因:${JSON.stringify(err)}`,
      });
    }
  });

};

module.exports= importexcel;
