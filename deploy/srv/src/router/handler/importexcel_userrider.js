const mongoose     = require('mongoose');
const _ = require('lodash');
const DBModels = require('../../db/models.js');
const dbplatform = require('../../db/modelsplatform.js');
const xlsx = require('node-xlsx');
const async = require('async');
const moment = require('moment');
const PubSub = require('pubsub-js');
//<----导入乘客功能待测试
const getriders = (listriders)=>{
  let newlistriders = [];
  _.map(listriders,(rider,index)=>{
    if(index > 0){
      let newrider = _.clone(rider);
      newrider.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
      newrider.starnum = 0;
      newrider.update_at = newrider.created_at;
      newlistriders.push(newrider);
    }
  });

  return newlistriders;
}

const sendtoplatform = (userEntity)=>{
  //<------发送给平台！
  const eModel = dbplatform.Platform_baseInfoPassengerModel;
  eModel.findOne({PassengerPhone:userEntity.username},(err,result)=>{
    let postdata = {
      registerdate:userEntity.created_at,
      passgngerphone:userEntity.username,
      passengername:userEntity.profile.nickname,
      passengergender:userEntity.profile.sex==='男'?'1':'0',
    };
    if(!err && !!result){
      //已存在
      PubSub.publish('Platformmsgs', {
        action:'Update',
        type:'Platform_baseInfoPassenger',
        payload:postdata
      });
    }
    else{
      //插入
      //通知平台插入
      PubSub.publish('Platformmsgs', {
        action:'Insert',
        type:'Platform_baseInfoPassenger',
        payload:postdata
      });
    }
  });
}


const importexcel = (excelfilepath,callbackfn)=>{
  //console.log(`开始导入excel:${excelfilepath}`);
  const obj = xlsx.parse(excelfilepath);
  //console.log(JSON.stringify(obj));
  let listriders = [];
  let resultkey = [];
  _.map(obj,(v)=>{
    _.map(v.data,(dataarray)=>{
      if(resultkey.length === 0){
        resultkey = dataarray;
      }
      else{
        let record = {};
        _.map(dataarray,(v,index)=>{
          const key = resultkey[index];
          _.set(record,key,v);
        });
        listriders.push(record);
      }
    });
  });

  //console.log(listriders);
  const newlistriders = getriders(listriders);
  //console.log(newlistriders);

  let asyncgetidsfnsz = [];
  _.map(newlistriders,(riderinfo)=>{
    const username = _.get(riderinfo,'username');
    const fn = (callbackfn)=>{
      const dbModel = DBModels.UserRiderModel;
      dbModel.findOneAndUpdate({username},{$set:riderinfo},{new:true,upsert:true},(err,newriderinfo)=>{
        if(!!newriderinfo){
          sendtoplatform(newriderinfo);
        }
        callbackfn(err,newriderinfo);

      });
    }
    asyncgetidsfnsz.push(fn);
  });

  async.parallel(asyncgetidsfnsz,(err,resultlist)=>{
    if(!err){
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
