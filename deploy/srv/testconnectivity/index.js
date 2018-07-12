const getmodels = require('./platformmodel');
const mongoose     = require('mongoose');
const async = require('async');
const _ = require('lodash');
const platformaction = require('../src/platform/platformaction');

const dbslist = getmodels();
const dbslistmap = {};
_.map(dbslist,(schmodel)=>{
  dbslistmap[schmodel.collectionname] = schmodel;
});

const platformmessage_upload_callback = (msg)=>{
  // console.log(`upload callback=====>platformmessage_upload_callback==>${JSON.stringify(msg)}`);
  const schmodel = dbslistmap[msg.collectionname];
  const idstring = msg._id;
  const idstringlist = msg._ids;
  if(!!schmodel && !!idstring){
    const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
    const id = mongoose.Types.ObjectId(idstring);
    dbModel.findOneAndUpdate({_id:id},{$set:{isuploaded:1}},()=>{

    });
  }

  if(!!schmodel && !!idstringlist){
    const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
    const bulk = dbModel.collection.initializeOrderedBulkOp();
    _.map(idstringlist,(idstring)=>{
      const id = mongoose.Types.ObjectId(idstring);
      bulk.find({_id:id})
        .updateOne({$set:{isuploaded:1}});
    });
    bulk.execute((err,result)=>{

    });
  }
  // upload callback=====>platformmessage_upload_callback==>{"collectionname":"baseinfopassenger","_id":"5a307c93781d3c0001e46bc2"}
};

const starttest_connectivity = (callbackfn)=>{

  let fnsz = [];
  _.map(dbslist,(schmodel)=>{
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
        if(!err && !!result){
          platformaction.postaction('upload',schmodel.collectionname,result);
        }
        callback(err,result);
      });
    });
  });

  async.parallel(fnsz,callbackfn);
}

exports.platformmessage_upload_callback = platformmessage_upload_callback;
exports.starttest_connectivity = starttest_connectivity;
