const PubSub = require('pubsub-js');
const getmodels = require('../testconnectivity/platformmodel');
const mongoose     = require('mongoose');
const async = require('async');
const _ = require('lodash');
const debug = require('debug')('appsrv:test');
const platformaction = require('../src/platform/platformaction');

let limit_perpage = 50;
let datalegitimacy_interval_handler;

const dbslist = getmodels(null);
const dbslistmap = {};
_.map(dbslist,(schmodel)=>{
  dbslistmap[schmodel.collectionname] = schmodel;
});


const starttest_resetuploaded = (callbackfn)=>{
  datalegitimacy_interval_handler = null;
  let fnsz = [];

  debug(`starttest_resetuploaded dbslist--->${dbslist.length}`);
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
  const dbslist_bat = getmodels(true);
  const dbslist_single = getmodels(false);

  debug(`dbslist_bat--->${dbslist_bat.length}`);
  debug(`dbslist_single--->${dbslist_single.length}`);

  _.map(dbslist_bat,(schmodel)=>{
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
      },(err,result)=>{
        let listdata = [];
        if(!err && !!result){
          if(result.length > 0){
            _.map(result,(doc)=>{
              const newdoc = platformaction.postaction_getnewdoc('upload',schmodel.collectionname,doc);
              listdata.push(newdoc);
              dbModel.findOneAndUpdate({_id:doc._id},{$set:{isuploaded:-1}},{new:true},(err,ctxuser)=>{
              });
            });

            debug(`publish bat ${schmodel.collectionname}->${listdata.length}`);
            PubSub.publish('platformmessage_upload',{
              action:'upload',//'findByIdAndUpdate',
              collectionname:schmodel.collectionname,//'baseinfocompany',
              doc:listdata
            });
          }
        }
        // console.log(`listdata:${listdata.length}`);
        callback(err,{
          collectionname:schmodel.collectionname,
          listdata
        });
      });
    });
  });

  _.map(dbslist_single,(schmodel)=>{
    fnsz.push((callback)=>{
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      dbModel.findOne({
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
      },(err,result)=>{
        let list = [];
        if(!err && !!result){
          list = [result];
          dbModel.findOneAndUpdate({_id:result._id},{$set:{isuploaded:-1}},{new:true},(err,ctxuser)=>{
          });

          debug(`publish single ${schmodel.collectionname}`);
          platformaction.postaction('upload',schmodel.collectionname,result);
        }
        callback(err,{
          collectionname:schmodel.collectionname,
          listdata:list
        });
      });
    });
  });

  debug(`run--->${fnsz.length}`);
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
          _.map(result,(resultdata,index)=>{
            if(resultdata.listdata.length > 0){
              isnum = true;
            }
            transmsg += `${resultdata.collectionname}->${resultdata.listdata.length},`;
          });
        }
        if(isnum && !!datalegitimacy_interval_handler){
          setImmediate(()=>{
            startupload(3000);
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
