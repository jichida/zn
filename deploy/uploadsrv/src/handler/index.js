const path = require('path');
const config = require('../config.js');
const getplatformdata = require('../restfulapi/getplatformdata');
const map_platformfn = require('../restfulapi/getmapfn');
const uploadtoplatform = require('../restfulapi/index');
const sftptosrv = require('../sftp/index');

const uploaddir = path.join(__dirname,config.uploaddir);
console.log("upload====>" + uploaddir);

const onmessage = (msgobj)=> {
  console.log("platformmessage:" + JSON.stringify(msgobj));
  let msg = msgobj.msg;
  let data = msgobj.data;
  const mapfn = map_platformfn[data.collectionname];
  if(!!mapfn){
    console.log(`getdata ==>${JSON.stringify(data)}`);
    let uploaddata = getplatformdata(data.action,data.collectionname,data.doc);
    if(!!uploaddata){
      uploadtoplatform(mapfn.IPCType,mapfn.uri,uploaddata);

      const collectionname = data.collectionname;
      const retdoc = data.doc;

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
  }
  else{
    console.log(`找不到===>${data.collectionname}`);
  }
};

module.exports = onmessage;
