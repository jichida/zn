const PubSub = require('pubsub-js');
const util = require('./util');
const _ = require('lodash');
const dbplatform = require('../db/modelsplatform.js');

let postaction = (actionname,collectionname,doc)=>{
  let retdoc = doc;
  if(actionname === 'findByIdAndUpdate' || actionname === 'save'){
    if(collectionname === 'rateddriverpunish' ||
    collectionname === 'rateddriver' ||
    collectionname === 'baseinfodrivereducate'){
      const baseInfoDriverModel = dbplatform.Platform_baseInfoDriverModel;
      baseInfoDriverModel.findOne({_id:retdoc.Platform_baseInfoDriverId},(err,driver)=>{
        if(!err && !!driver){
          let newdoc = _.clone(retdoc.toJSON());
          newdoc = _.omit(newdoc,['Platform_baseInfoDriverId','__v']);
          newdoc.LicenseId = driver.LicenseId;
          if(collectionname === 'baseinfodrivereducate'){
            newdoc.Address = driver.Address;
          }
          console.log(newdoc);
          PubSub.publish('platformmessage_upload',{
            action:actionname,//'findByIdAndUpdate',
            collectionname:collectionname,//'baseinfocompany',
            doc:newdoc
          });
        }
      });
      return;
    }
  }



  PubSub.publish('platformmessage_upload',{
    action:actionname,//'findByIdAndUpdate',
    collectionname:collectionname,//'baseinfocompany',
    doc:retdoc
  });
}

exports.postaction = postaction;
