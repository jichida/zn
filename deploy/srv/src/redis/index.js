const redis = require("redis");
const config = require('../config.js');

const  client_pub = redis.createClient(config.srvredis);
const  client_sub = redis.createClient(config.srvredis);

const handlerfnmap = {};
const setSubscribeHandler = (channel,handlerfn)=>{
  handlerfnmap[channel] = handlerfn;
}

const publish = (channel,message)=>{
  client_pub.publish(channel,JSON.stringify(message));
}

client_sub.on('ready', function () {
    client_sub.subscribe('platformmessage_upload');
    client_sub.subscribe('platformmessage_upload_callback');
});

client_sub.on('message', (channel, message)=> {
    const handler = handlerfnmap[channel];
    if(!!handler){
      let msg = message;
      try{
        msg = JSON.parse(message);
      }
      catch(e){

      }
      handler(msg);
    }
});

exports.setSubscribeHandler = setSubscribeHandler;
exports.publish = publish;
