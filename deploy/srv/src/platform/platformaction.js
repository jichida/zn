const PubSub = require('pubsub-js');
const util = require('./util');
const _ = require('lodash');
const dbplatform = require('../db/modelsplatform.js');

const converturltofilename = (file_url)=>{
  let arr = file_url.split("/");
  return arr[arr.length - 1];
}

const postaction = (actionname,collectionname,doc)=>{
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
          //console.log(newdoc);
          PubSub.publish('platformmessage_upload',{
            action:actionname,//'findByIdAndUpdate',
            collectionname:collectionname,//'baseinfocompany',
            doc:newdoc
          });
        }
      });
      return;
    }

    if(collectionname === 'baseinfocompany' ||
    collectionname === 'baseinfovehicle' ||
    collectionname === 'baseinfodriver'){
      //conver URL->file
      let newdoc = _.clone(retdoc.toJSON());
      if(collectionname === 'baseinfocompany'){
        newdoc.LegalPhoto = converturltofilename(newdoc.LegalPhotoURL);
        newdoc = _.omit(newdoc,['LegalPhotoURL','__v']);
      }
      else if(collectionname === 'baseinfovehicle'){
        newdoc.PhotoId = converturltofilename(newdoc.PhotoIdURL);
        newdoc = _.omit(newdoc,['PhotoIdURL','__v']);
      }
      else if(collectionname === 'baseinfodriver'){
        newdoc.LicensePhotoId = converturltofilename(newdoc.LicensePhotoIdURL);
        newdoc.PhotoId = converturltofilename(newdoc.PhotoIdURL);
        newdoc = _.omit(newdoc,['LicensePhotoIdURL','PhotoIdURL','__v']);
      }

      PubSub.publish('platformmessage_upload',{
        action:actionname,//'findByIdAndUpdate',
        collectionname:collectionname,//'baseinfocompany',
        doc:newdoc
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
