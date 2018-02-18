const PubSub = require('pubsub-js');
const util = require('./util');
const _ = require('lodash');
const dbplatform = require('../db/modelsplatform.js');

const converturltofilename = (file_url)=>{
  if(typeof file_url === 'string'){
    let arr = file_url.split("/");
    return arr[arr.length - 1];
  }
  return null;
}

const preaction = (actionname,collectionname,doc,callbackfn)=>{
  let retdoc = doc;
  if(actionname === 'findByIdAndUpdate' || actionname === 'save'){
    if(collectionname === 'ratedpassengercomplaint'){
      const orderMatchModel = dbplatform.Platform_orderMatchModel;
      orderMatchModel.findOne({_id:retdoc.Platform_orderMatchId},(err,order)=>{
        let newdoc = _.clone(retdoc);
        if(!err && !!order){
          newdoc.OrderId = order.OrderId;
          newdoc.LicenseId = order.LicenseId;
        }
        callbackfn(newdoc);
      });
      return;
    }
    if(collectionname === 'rateddriverpunish' ||
    collectionname === 'rateddriver' ||
    collectionname === 'baseinfodrivereducate'){
      const baseInfoDriverModel = dbplatform.Platform_baseInfoDriverModel;
      baseInfoDriverModel.findOne({_id:retdoc.Platform_baseInfoDriverId},(err,driver)=>{
        let newdoc = _.clone(retdoc);
        if(!err && !!driver){
          newdoc.LicenseId = driver.LicenseId;
          if(collectionname === 'baseinfodrivereducate'){
            newdoc.Address = driver.Address;
          }
        }
        callbackfn(newdoc);
      });
      return;
    }
    if(collectionname === 'baseinfovehicleinsurance'){
      const baseInfoVehicleModel = dbplatform.Platform_baseInfoVehicleModel;
      baseInfoVehicleModel.findOne({_id:retdoc.Platform_baseInfoVehicleId},(err,vehicle)=>{
        let newdoc = _.clone(retdoc);
        if(!err && !!vehicle){
          newdoc.VehicleNo = vehicle.VehicleNo;
        }
        callbackfn(newdoc);
      });
      return;
    }
    if(collectionname === 'baseinfocompany' ||
    collectionname === 'baseinfovehicle' ||
    collectionname === 'baseinfodriver'){
      //conver URL->file
      let newdoc = _.clone(retdoc);
      if(collectionname === 'baseinfocompany'){
        newdoc.LegalPhoto = converturltofilename(newdoc.LegalPhotoURL);
        // newdoc = _.omit(newdoc,['LegalPhotoURL','__v']);
      }
      else if(collectionname === 'baseinfovehicle'){
        newdoc.PhotoId = converturltofilename(newdoc.PhotoIdURL);
        // newdoc = _.omit(newdoc,['PhotoIdURL','__v']);
      }
      else if(collectionname === 'baseinfodriver'){
        newdoc.LicensePhotoId = converturltofilename(newdoc.LicensePhotoIdURL);
        newdoc.PhotoId = converturltofilename(newdoc.PhotoIdURL);
        // newdoc = _.omit(newdoc,['LicensePhotoIdURL','PhotoIdURL','__v']);
      }
      callbackfn(newdoc);
      return;
    }

  }
  callbackfn(doc);
}

const postaction = (actionname,collectionname,doc)=>{
  let retdoc = doc;
  if(actionname === 'findByIdAndUpdate' || actionname === 'save' || actionname === 'upload'){
    if(collectionname === 'rateddriverpunish' ||
    collectionname === 'rateddriver' ||
    collectionname === 'baseinfodrivereducate'){
      let newdoc = _.clone(retdoc.toJSON());
      retdoc = _.omit(newdoc,['Platform_baseInfoDriverId','__v']);
    }

    if(collectionname === 'baseinfovehicleinsurance'){
      let newdoc = _.clone(retdoc.toJSON());
      retdoc = _.omit(newdoc,['Platform_baseInfoVehicleId','__v']);
    }

    if(collectionname === 'baseinfocompany' ||
    collectionname === 'baseinfovehicle' ||
    collectionname === 'baseinfodriver'){
      //conver URL->file
      let newdoc = _.clone(retdoc.toJSON());
      if(collectionname === 'baseinfocompany'){
        newdoc = _.omit(newdoc,['LegalPhotoURL','__v']);
      }
      else if(collectionname === 'baseinfovehicle'){
        newdoc = _.omit(newdoc,['PhotoIdURL','__v']);
      }
      else if(collectionname === 'baseinfodriver'){
        newdoc = _.omit(newdoc,['LicensePhotoIdURL','PhotoIdURL','__v']);
      }

      retdoc = newdoc;
    }
  }

  PubSub.publish('platformmessage_upload',{
    action:actionname,//'findByIdAndUpdate',
    collectionname:collectionname,//'baseinfocompany',
    doc:retdoc
  });
}

exports.preaction = preaction;
exports.postaction = postaction;
