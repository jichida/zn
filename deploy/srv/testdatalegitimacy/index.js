const PubSub = require('pubsub-js');
const getmodels = require('../testconnectivity/platformmodel');
const mongoose     = require('mongoose');
const async = require('async');
const _ = require('lodash');
const platformaction = require('../src/platform/platformaction');

const limit_perpage = 20;

const dbslist = getmodels();
const dbslistmap = {};
_.map(dbslist,(schmodel)=>{
  dbslistmap[schmodel.collectionname] = schmodel;
});


const starttest_resetuploaded = (callbackfn)=>{
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

const starttest_datalegitimacy = (callbackfn)=>{

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
        limit: limit_perpage,
        sort:{ "_id": 1}
      },(err,result)=>{
        if(!err && !!result){
          let listdata = [];
          _.map(result,(doc)=>{
            const newdoc = platformaction.postaction_getnewdoc('upload',schmodel.collectionname,doc);
            listdata.push(newdoc);
          });
          PubSub.publish('platformmessage_upload',{
            action:'upload',//'findByIdAndUpdate',
            collectionname:schmodel.collectionname,//'baseinfocompany',
            doc:listdata
          });
        }
        callback(err,result);
      });
    });
  });

  async.parallel(fnsz,callbackfn);
}

exports.starttest_resetuploaded = starttest_resetuploaded;
exports.starttest_datalegitimacy = starttest_datalegitimacy;
