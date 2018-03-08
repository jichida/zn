require('es6-promise').polyfill();
require('isomorphic-fetch');

const config = require('../config.js');
// const map = require('lodash.map');

const fetchurl =`${config.platformserverurl}`;

console.log(`url-->${fetchurl}`);

const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    console.log(`返回状态码-->${response.status}`);
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
    console.log(`开始发送接口-->${JSON.stringify(postdata)}`);

    return fetch(`${fetchurl}${uri}`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(postdata)
    })
    .then(statusHelper)
    .then(response => response.json());
}

module.exports = uploadtoplatform;
