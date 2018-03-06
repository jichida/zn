const path = require('path');
const config = require('../config.js');
const getplatformdata = require('../restfulapi/getplatformdata');
const map_platformfn = require('../restfulapi/getmapfn');
const uploadtoplatform = require('../restfulapi/index');
const sftptosrv = require('../sftp/index');
const redis = require('../redis/index.js');
const _ = require('lodash');

const uploaddir = config.uploaddir || path.join(__dirname,'../../dist/uploader');
console.log("upload====>" + uploaddir);

const uploadsftp = (collectionname,retdoc)=>{
  console.log(`================>${collectionname}`);

  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    //conver URL->file
    const newdoc = retdoc;
    if(collectionname === 'baseinfocompany'){
      sftptosrv(uploaddir,newdoc.LegalPhoto ,(err,result)=>{
        console.log(err);
        console.log(result);
      });
    }
    else if(collectionname === 'baseinfovehicle'){
      sftptosrv(uploaddir,newdoc.PhotoId ,(err,result)=>{
        console.log(err);
        console.log(result);
      });
    }
    else if(collectionname === 'baseinfodriver'){
      sftptosrv(uploaddir,newdoc.LicensePhotoId ,(err,result)=>{
        console.log(err);
        console.log(result);
      });
      sftptosrv(uploaddir,newdoc.PhotoId ,(err,result)=>{
        console.log(err);
        console.log(result);
      });
    }
  }
}

const onmessage = (msgobj)=> {
  console.log("platformmessage:" + JSON.stringify(msgobj));
  const data = msgobj;
  const mapfn = map_platformfn[data.collectionname];
  if(!!mapfn){
    console.log(`getdata ==>${JSON.stringify(data)}`);

    if(!_.isArray(data.doc)){
      const uploaddata = getplatformdata(data.action,data.collectionname,data.doc);
      if(!!uploaddata){
        uploadtoplatform(mapfn.IPCType,mapfn.uri,uploaddata).then((res)=>{
          console.log(`uploadtoplatform===>${JSON.stringify(res)}`);
          redis.publish(`platformmessage_upload_callback`,{
            collectionname:data.collectionname,
            _id:data.doc._id,
          });
        }).catch((e)=>{
          console.log(e);
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
          console.log(`uploadtoplatform===>${JSON.stringify(res)}`);
          redis.publish(`platformmessage_upload_callback`,{
            collectionname:data.collectionname,
            _ids,
          });
        }).catch((e)=>{
          console.log(e);
        });

        _.map(uploaddatalists,(doc)=>{
          uploadsftp(data.collectionname,doc);
        });

      }
    }

  }
  else{
    console.log(`找不到===>${data.collectionname}`);
  }
};

module.exports = onmessage;
