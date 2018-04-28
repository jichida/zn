const path = require('path');
const config = require('../config.js');
const getplatformdata = require('../restfulapi/getplatformdata');
const map_platformfn = require('../restfulapi/getmapfn');
const uploadtoplatform = require('../restfulapi/index');
const sftptosrv = require('../ftps/index');
const redis = require('../redis/index.js');
const debug = require('debug')('uploadsrv:handler')
const _ = require('lodash');
const winston = require('../log/index.js');
const async = require('async');
const fs = require('fs');

const uploaddir = config.uploaddir || path.join(__dirname,'../../dist/uploader');
debug("upload====>" + uploaddir);

const checkfile_exists =(filename,collectionname,retdoc)=>{
  if(!!filename){
    if (!fs.existsSync(`${uploaddir}/${filename}`)) {
        winston.getlog().error(`检查文件不存在-->${collectionname}--->文件名:${filename}--->全路径:${uploaddir}/${filename}`);
    }
  }
}
const recordid =(collectionname,doc)=>{
  if(_.isArray(doc)){
    if(doc.length > 0){
      if(collectionname === 'baseinfovehicle'){
        winston.getlog().info(`批量接口【车辆信息】-->${collectionname}-->个数${doc.length}--->第一条车牌号:${doc[0].VehicleNo}`);
      }
      else if(collectionname === 'baseinfodriver'){
        winston.getlog().info(`批量接口【司机信息】-->${collectionname}-->个数${doc.length}--->第一条驾驶证号:${doc[0].LicenseId}`);
      }
    }

  }
  else{
    if(collectionname === 'baseinfovehicle'){
      winston.getlog().info(`单个接口【车辆信息】-->${collectionname}-->车牌号:${doc.VehicleNo}`);
    }
    else if(collectionname === 'baseinfodriver'){
      winston.getlog().info(`单个接口【司机信息】-->${collectionname}-->驾驶证号:${doc.LicenseId}`);
    }
  }
}


const uploadsftp = (collectionname,retdoc)=>{
  debug(`================>${collectionname}`);
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
    recordid(data.collectionname,data.doc);

    if(!_.isArray(data.doc)){
      getplatformdata(data.action,data.collectionname,data.doc,(uploaddata)=>{
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
      });

    }
    else{
      //bat
      const _ids = [];
      const uploaddatalists = [];
      let fnsz = [];
      _.map(data.doc,(doc)=>{
        fnsz.push((callbackfn)=>{
          getplatformdata(data.action,data.collectionname,doc,(uploaddata)=>{
            if(!!uploaddata){
                uploaddatalists.push(uploaddata);
                _ids.push(doc._id);
              }
            });
        });
      });

      async.series(fnsz,(err,result)=>{
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
      });
    }

  }
  else{
    //console.log(`找不到===>${data.collectionname}`);
  }
};

module.exports = onmessage;
