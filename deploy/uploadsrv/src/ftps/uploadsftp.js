const config = require('../config.js');
const sftptosrv = require('../ftps/index');
const path = require('path');
const fs = require('fs');
const winston = require('../log/index.js');
const async = require('async');
const debug = require('debug')('uploadsrv:uploadsftp')

const uploaddir = config.uploaddir || path.join(__dirname,'../../dist/uploader');
debug("upload====>" + uploaddir);


const converturltofilename = (file_url)=>{
  if(typeof file_url === 'string'){
    let arr = file_url.split("/");
    return arr[arr.length - 1];
  }
  return null;
}

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
  let localfilename = converturltofilename(retdoc[id]);
  let remotefilename = localfilename;
  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    if(collectionname === 'baseinfocompany'){
      if(id === 'LegalPhotoURL'){
        remotefilename = `${localfilename}${retdoc['CompanyId']}`;
      }
    }
    else if(collectionname === 'baseinfovehicle'){
      if(id === 'PhotoIdURL'){
        remotefilename = `${localfilename}${retdoc['VehicleNo']}`;
      }
    }
    else if(collectionname === 'baseinfodriver'){
      if(id === 'LicensePhotoIdURL'){
        remotefilename = `${localfilename}${retdoc['LicenseId']}`;
      }
      if(id === 'PhotoIdURL'){
        remotefilename = `${localfilename}${retdoc['DriverName']}`;
      }
    }
  }
  debug(`getremotefilename->${remotefilename}`);
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
      const filename = converturltofilename(retdoc.LegalPhotoURL);
      isfileexists = checkfile_exists(filename,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(filename);
      }
      debug(`${collectionname}->${filename}->${isfileexists}->${retdoc.LegalPhotoURL}`);
    }
    else if(collectionname === 'baseinfovehicle'){
      const filename = converturltofilename(retdoc.PhotoIdURL);
      isfileexists = checkfile_exists(filename,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(filename);
      }
      debug(`${collectionname}->${filename}->${isfileexists}->${retdoc.PhotoIdURL}`);
    }
    else if(collectionname === 'baseinfodriver'){
      const filename1 = converturltofilename(retdoc.LicensePhotoIdURL);
      const filename2 = converturltofilename(retdoc.PhotoIdURL);
      isfileexists = checkfile_exists(filename1,collectionname,retdoc);
      if(isfileexists){
        extname = path.extname(filename1);
      }
      isfileexists2 = checkfile_exists(filename2,collectionname,retdoc);
      if(isfileexists2){
        extname2 = path.extname(filename2);
      }
      debug(`${collectionname}->${filename1}->${isfileexists}->${retdoc.LicensePhotoIdURL}`);
      debug(`${collectionname}->${filename2}->${isfileexists2}->${retdoc.PhotoIdURL}`);
    }
  }


  if(collectionname === 'baseinfocompany' ||
  collectionname === 'baseinfovehicle' ||
  collectionname === 'baseinfodriver'){
    //conver URL->file
    const newdoc = retdoc;
    if(collectionname === 'baseinfocompany' && isfileexists){
      fnsz.push((callbackfn)=>{
        const localfilename = converturltofilename(retdoc.LegalPhotoURL);
        const remotefilename = getremotefilename(collectionname,retdoc,'LegalPhotoURL');
        sftptosrv(uploaddir,localfilename,`${collectionname}`,`${remotefilename}${extname}`,(err,result)=>{
          if(!err && !!result){
            newdoc.LegalPhoto = result;
          }
          callbackfn(null,true);
        });
      });

    }
    else if(collectionname === 'baseinfovehicle' && isfileexists){
      fnsz.push((callbackfn)=>{
        const localfilename = converturltofilename(retdoc.PhotoIdURL);
        const remotefilename = getremotefilename(collectionname,retdoc,'PhotoIdURL');
        sftptosrv(uploaddir,localfilename,collectionname,`${remotefilename}${extname}`,(err,result)=>{
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
          const localfilename = converturltofilename(retdoc.LicensePhotoIdURL);
          const remotefilename = getremotefilename(collectionname,retdoc,'LicensePhotoIdURL');
          sftptosrv(uploaddir,localfilename,collectionname,`${remotefilename}${extname}`,(err,result)=>{
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
          const localfilename = converturltofilename(retdoc.PhotoIdURL);
          const remotefilename = getremotefilename(collectionname,retdoc,'PhotoIdURL');
          sftptosrv(uploaddir,localfilename,collectionname,`${remotefilename}${extname2}`,(err,result)=>{
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
