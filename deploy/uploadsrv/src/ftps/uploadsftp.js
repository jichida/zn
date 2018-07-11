const config = require('../config.js');
const sftptosrv = require('../ftps/index');
const path = require('path');
const fs = require('fs');
const winston = require('../log/index.js');
const async = require('async');
const debug = require('debug')('uploadsrv:uploadsftp')

const uploaddir = config.uploaddir || path.join(__dirname,'../../dist/uploader');
debug("upload====>" + uploaddir);

const checkfile_exists =(filename,collectionname,retdoc)=>{
  if(!!filename){
    if (!fs.existsSync(`${uploaddir}/${filename}`)) {
        winston.getlog().error(`检查文件不存在-->${collectionname}--->文件名:${filename}--->全路径:${uploaddir}/${filename}`);
    }
  }
}

const getremotefilename = (collectionname,retdoc,id)=>{
  let remotefilename = retdoc[id];
  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    if(collectionname === 'baseinfocompany'){
      if(id === 'LegalPhoto'){
        remotefilename = `${retdoc['CompanyId']}`;
      }
    }
    else if(collectionname === 'baseinfovehicle'){
      if(id === 'PhotoId'){
        remotefilename = `${retdoc['VehicleNo']}`;
      }
    }
    else if(collectionname === 'baseinfodriver'){
      if(id === 'LicensePhotoId'){
        remotefilename = `${retdoc['LicenseId']}`;
      }
      if(id === 'PhotoId'){
        remotefilename = `${retdoc['DriverName']}`;
      }
    }
  }
  return remotefilename;
}


const uploadsftp = (collectionname,retdoc,callbackfn)=>{
  debug(`================>${collectionname}`);


  let fnsz = [];
  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    if(collectionname === 'baseinfocompany'){
      checkfile_exists(retdoc.LegalPhoto,collectionname,retdoc);
    }
    else if(collectionname === 'baseinfovehicle'){
      checkfile_exists(retdoc.PhotoId,collectionname,retdoc);
    }
    else if(collectionname === 'baseinfodriver'){
      checkfile_exists(retdoc.LicensePhotoId,collectionname,retdoc);
      checkfile_exists(retdoc.PhotoId,collectionname,retdoc);
    }
  }


  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    //conver URL->file
    const newdoc = retdoc;
    if(collectionname === 'baseinfocompany'){
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'LegalPhoto');
        sftptosrv(uploaddir,newdoc.LegalPhoto,collectionname,remotefilename,(err,result)=>{
          debug(err);
          debug(result);
          if(!err && !!result){
            newdoc.LegalPhoto = result;
          }
          callbackfn(null,true);
        });
      });

    }
    else if(collectionname === 'baseinfovehicle'){
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'PhotoId');
        sftptosrv(uploaddir,newdoc.PhotoId,collectionname,remotefilename,(err,result)=>{
          debug(err);
          debug(result);
          if(!err && !!result){
            newdoc.PhotoId = result;
          }
          callbackfn(null,true);
        });
      });
    }
    else if(collectionname === 'baseinfodriver'){
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'LicensePhotoId');
        sftptosrv(uploaddir,newdoc.LicensePhotoId,collectionname,remotefilename,(err,result)=>{
          debug(err);
          debug(result);
          if(!err && !!result){
            newdoc.LicensePhotoId = result;
          }
          callbackfn(null,true);
        });
      });
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'PhotoId');
        sftptosrv(uploaddir,newdoc.PhotoId,collectionname,remotefilename,(err,result)=>{
          debug(err);
          debug(result);
          if(!err && !!result){
            newdoc.PhotoId = result;
          }
          callbackfn(null,true);
        });
      });
    }
  }

  if(fnsz.length > 0){
    async.series(fnsz,(err,result)=>{
      callbackfn(retdoc);
    });
  }
  else{
    callbackfn(retdoc);
  }
}

module.exports = uploadsftp;
