require('es6-promise').polyfill();
require('isomorphic-fetch');
const debug = require('debug')("uploadsrv:upload");
const config = require('../config.js');
const winston = require('../log/index.js');
// const map = require('lodash.map');

const fetchurl =`${config.platformserverurl}`;

debug(`url-->${fetchurl}`);

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
    .then((response)=> {
      if (response.status >= 200 && response.status < 300) {
        debug(`${IPCType}-->返回状态码-->${response.status}`);
        winston.getlog().info(`返回状态码-->${response.status}`);
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    })
    .then(body => {
      debug(`${IPCType}-->返回结果-->${body}`);
      winston.getlog().info(`返回结果-->${body}`);
      Promise.resolve(true);
    });
}

module.exports = uploadtoplatform;
