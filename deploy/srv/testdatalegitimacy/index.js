const PubSub = require('pubsub-js');
const getmodels = require('../testconnectivity/platformmodel');
const mongoose     = require('mongoose');
const async = require('async');
const _ = require('lodash');
const platformaction = require('../src/platform/platformaction');

let limit_perpage = 50;
let datalegitimacy_interval_handler;

const dbslist = getmodels();
const dbslistmap = {};
_.map(dbslist,(schmodel)=>{
  dbslistmap[schmodel.collectionname] = schmodel;
});


const starttest_resetuploaded = (callbackfn)=>{
  datalegitimacy_interval_handler = null;
  let fnsz = [];
  _.map(dbslist,(schmodel)=>{
    fnsz.push((callback)=>{
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      dbModel.update({},{$set:{isuploaded:0}},{ multi: true },(err,result)=>{
        callback(err,result);
      });
    });
  });

  const flagdb = ['baseinfocompany','baseinfocompanystat','baseinfocompanypay','baseinfocompanyservice',
  'baseinfocompanypermit','baseinfocompanyfare','baseinfovehicle','baseinfovehicleinsurance'];
  _.map(flagdb,(collectionname)=>{
    if(!!dbslistmap[collectionname]){
      fnsz.push((callback)=>{
        const schmodel = dbslistmap[collectionname];
        const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.update({
          $or:[
            {
              Flag:2
            },
            {
              Flag:
              {
                $exists:false
              }
            }
          ]
        },{$set:{Flag:1}},{ multi: true },(err,result)=>{
          callback(err,result);
        });
      });
    }
  });

  async.parallel(fnsz,callbackfn);
}

const starttest_datalegitimacy = ({perpage},callbackfn)=>{
  limit_perpage = perpage;
  let fnsz = [];
  _.map(dbslist,(schmodel)=>{
    fnsz.push((callback)=>{
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      dbModel.find({
        $or:[
          {
            isuploaded:0
          },
          {
            isuploaded:
            {
              $exists:false
            }
          }
        ]
      },null,{
        skip: 0,
        limit: perpage,
        sort:{ "_id": 1}
      }).lean().exec((err,result)=>{
        let listdata = [];
        if(!err && !!result){
          if(result.length > 0){
            _.map(result,(doc)=>{
              const newdoc = platformaction.postaction_getnewdoc('upload',schmodel.collectionname,doc);
              listdata.push(newdoc);
              dbModel.findOneAndUpdate({_id:doc._id},{$set:{isuploaded:-1}},{new:true},(err,ctxuser)=>{
              });
            });
            PubSub.publish('platformmessage_upload',{
              action:'upload',//'findByIdAndUpdate',
              collectionname:schmodel.collectionname,//'baseinfocompany',
              doc:listdata
            });
          }
        }
        console.log(`listdata:${listdata.length}`);
        callback(err,listdata);
      });
    });
  });

  async.parallel(fnsz,callbackfn);
}

let transmsg = '';
const starttest_datalegitimacy_interval = ({perpage},callbackfn)=>{
  limit_perpage = perpage;
  if(!!datalegitimacy_interval_handler){
    clearTimeout(datalegitimacy_interval_handler);
    datalegitimacy_interval_handler = null;
  }

  const startupload = (timeoutdelay)=>{
    datalegitimacy_interval_handler = setTimeout(()=>{
      starttest_datalegitimacy({perpage},(err,result)=>{
        isnum = true;
        if(!err && !!result){
          isnum = false;
          transmsg = `正在传输:${result.length}==》`;
          _.map(result,(list,index)=>{
            if(list.length > 0){
              isnum = true;
            }
            transmsg += `${index}->${list.length},`;
          });
        }
        if(isnum && !!datalegitimacy_interval_handler){
          setImmediate(()=>{
            startupload(15000);
          });
        }
        else{
          transmsg = '传输完毕';
        }
      });
    },timeoutdelay);
  }

  startupload(1);
  callbackfn(null,{
    msg:'OK'
  });
}

const starttest_datalegitimacy_interval_getstatus = (callbackfn)=>{
  if(!datalegitimacy_interval_handler){
    callbackfn(null,{
      msg:'传输停止'
    });
  }
  else{
    callbackfn(null,{
      msg:transmsg
    });
  }
}

exports.starttest_resetuploaded = starttest_resetuploaded;
exports.starttest_datalegitimacy = starttest_datalegitimacy;
exports.starttest_datalegitimacy_interval = starttest_datalegitimacy_interval;
exports.starttest_datalegitimacy_interval_getstatus = starttest_datalegitimacy_interval_getstatus;
