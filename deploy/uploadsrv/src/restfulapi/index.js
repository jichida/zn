require('es6-promise').polyfill();
require('isomorphic-fetch');
const debug = require("uploadsrv:upload");
const config = require('../config.js');
const winston = require('../log/log.js');
// const map = require('lodash.map');

const fetchurl =`${config.platformserverurl}`;

debug(`url-->${fetchurl}`);

const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    debug(`返回状态码-->${response.status}`);
    winston.getlog().info(`返回状态码-->${response.status}`);
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const uploadtoplatform = (IPCType,uri,data)=>{
    let postdata = {
      Source:'0',
      CompanyId:config.CompanyId,
      IPCType,
    };
    postdata[IPCType] = data;
    winston.getlog().info(`开始发送接口-->${JSON.stringify(postdata)}`);
    debug(`开始发送接口-->${JSON.stringify(postdata)}`);

    return fetch(`${fetchurl}${uri}`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(postdata)
    })
    .then(statusHelper)
    .then(response => {
      const retjson = response.json();
      debug(`返回结果-->${JSON.stringify(retjson)}`);
      winston.getlog().info(`返回结果-->${JSON.stringify(retjson)}`);
      Promise.resolve(retjson);
    });
}

module.exports = uploadtoplatform;
