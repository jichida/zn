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
    winston.getlog().info(postdata);
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
      debug(`${IPCType}-->返回状态码-->${response.status}`);
      winston.getlog().info(`返回状态码-->${response.status}`);
      if (response.status >= 200 && response.status < 300) {
        debug(`${IPCType}-->OK`);
        winston.getlog().info(`${IPCType}-->OK`);
        return Promise.resolve(response)
      } else {
        debug(`${IPCType}-->Error`);
        winston.getlog().error(`${IPCType}-->Error`);
        response.json().then((result)=>{
          winston.getlog().error(result);
        })

        return Promise.reject()
      }
    })
    .then(body => {
      debug(`${IPCType}-->返回结果-->`);
      winston.getlog().info(`${IPCType}-->返回结果-->`);
      Promise.resolve();
    });
}

module.exports = uploadtoplatform;
