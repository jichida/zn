const path = require('path');
const config = require('../config.js');
const getplatformdata = require('../restfulapi/getplatformdata');
const map_platformfn = require('../restfulapi/getmapfn');
const uploadtoplatform = require('../restfulapi/index');
const sftptosrv = require('../ftps/index');
const redis = require('../redis/index.js');
const debug = require('debug')('uploadsrv:handler')
const _ = require('lodash');

const uploaddir = config.uploaddir || path.join(__dirname,'../../dist/uploader');
debug("upload====>" + uploaddir);

const uploadsftp = (collectionname,retdoc)=>{
  debug(`================>${collectionname}`);

  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    //conver URL->file
    const newdoc = retdoc;
    if(collectionname === 'baseinfocompany'){
      sftptosrv(uploaddir,newdoc.LegalPhoto ,(err,result)=>{
        debug(err);
        debug(result);
      });
    }
    else if(collectionname === 'baseinfovehicle'){
      sftptosrv(uploaddir,newdoc.PhotoId ,(err,result)=>{
        debug(err);
        debug(result);
      });
    }
    else if(collectionname === 'baseinfodriver'){
      sftptosrv(uploaddir,newdoc.LicensePhotoId ,(err,result)=>{
        debug(err);
        debug(result);
      });
      sftptosrv(uploaddir,newdoc.PhotoId ,(err,result)=>{
        debug(err);
        debug(result);
      });
    }
  }
}

const onmessage = (msgobj)=> {
  debug("platformmessage:" + JSON.stringify(msgobj));
  const data = msgobj;
  const mapfn = map_platformfn[data.collectionname];
  if(!!mapfn){
    debug(`getdata ==>${JSON.stringify(data)}`);

    if(!_.isArray(data.doc)){
      const uploaddata = getplatformdata(data.action,data.collectionname,data.doc);
      if(!!uploaddata){
        uploadtoplatform(mapfn.IPCType,mapfn.uri,uploaddata).then((res)=>{
          // debug(`uploadtoplatform===>${res}`);
          redis.publish(`platformmessage_upload_callback`,{
            collectionname:data.collectionname,
            _id:data.doc._id,
          });
        }).catch((e)=>{
          debug(e);
        });
        uploadsftp(data.collectionname,data.doc);
      }
    }
    else{
      //bat
      const _ids = [];
      const uploaddatalists = [];
      _.map(data.doc,(doc)=>{
        const uploaddata = getplatformdata(data.action,data.collectionname,doc);
        if(!!uploaddata){
          uploaddatalists.push(uploaddata);
          _ids.push(doc._id);
        }
      });

      if(uploaddatalists.length > 0){
        uploadtoplatform(mapfn.IPCType,mapfn.uri,uploaddatalists).then((res)=>{
          // debug(`uploadtoplatform===>${res}`);
          redis.publish(`platformmessage_upload_callback`,{
            collectionname:data.collectionname,
            _ids,
          });
        }).catch((e)=>{
          debug(e);
        });

        _.map(uploaddatalists,(doc)=>{
          uploadsftp(data.collectionname,doc);
        });

      }
    }

  }
  else{
    //console.log(`找不到===>${data.collectionname}`);
  }
};

module.exports = onmessage;
