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
  let isfileexists = false;
  if(!!filename){
    if (!fs.existsSync(`${uploaddir}/${filename}`)) {
        winston.getlog().error(`检查文件不存在-->${collectionname}--->文件名:${filename}--->全路径:${uploaddir}/${filename}`);
    }
    else{
      isfileexists = true;
    }
    debug(`fileexits:${collectionname}--->文件名:${filename}--->isfileexists:${isfileexists}`);
  }
  return isfileexists;
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

  let isfileexists = false;
  let isfileexists2 = false;
  let extname,extname2;
  let fnsz = [];
  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    if(collectionname === 'baseinfocompany'){
      isfileexists = checkfile_exists(retdoc.LegalPhoto,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(retdoc.LegalPhoto);
      }
    }
    else if(collectionname === 'baseinfovehicle'){
      isfileexists = checkfile_exists(retdoc.PhotoId,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(retdoc.PhotoId);
      }
    }
    else if(collectionname === 'baseinfodriver'){
      isfileexists = checkfile_exists(retdoc.LicensePhotoId,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(retdoc.LicensePhotoId);
      }
      isfileexists2 = checkfile_exists(retdoc.PhotoId,collectionname,retdoc);
      if(isfileexists2){
        extname2 = path.extname(retdoc.PhotoId);
      }
    }
  }


  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    //conver URL->file
    const newdoc = retdoc;
    if(collectionname === 'baseinfocompany' && isfileexists){
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'LegalPhoto');
        sftptosrv(uploaddir,newdoc.LegalPhoto,`${collectionname}${extname}`,remotefilename,(err,result)=>{
          if(!err && !!result){
            newdoc.LegalPhoto = result;
          }
          callbackfn(null,true);
        });
      });

    }
    else if(collectionname === 'baseinfovehicle' && isfileexists){
      fnsz.push((callbackfn)=>{
        const remotefilename = getremotefilename(collectionname,retdoc,'PhotoId');
        sftptosrv(uploaddir,newdoc.PhotoId,collectionname,`${collectionname}${extname}`,(err,result)=>{
          if(!err && !!result){
            newdoc.PhotoId = result;
          }
          callbackfn(null,true);
        });
      });
    }
    else if(collectionname === 'baseinfodriver'){
      if(isfileexists){
        fnsz.push((callbackfn)=>{
          const remotefilename = getremotefilename(collectionname,retdoc,'LicensePhotoId');
          sftptosrv(uploaddir,newdoc.LicensePhotoId,collectionname,`${collectionname}${extname}`,(err,result)=>{
            debug(err);
            debug(result);
            if(!err && !!result){
              newdoc.LicensePhotoId = result;
            }
            callbackfn(null,true);
          });
        });
      }

      if(isfileexists2){
        fnsz.push((callbackfn)=>{
          const remotefilename = getremotefilename(collectionname,retdoc,'PhotoId');
          sftptosrv(uploaddir,newdoc.PhotoId,collectionname,`${collectionname}${extname2}`,(err,result)=>{
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
