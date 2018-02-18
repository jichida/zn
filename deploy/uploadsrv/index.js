const redis = require("redis");
const winston = require('./src/log/index.js');
const handlermsg = require('./src/handler/index.js');
const config = require('./src/config.js');

const clientRedis = redis.createClient(config.srvredis);

winston.initLog();

clientRedis.on('ready',()=> {
    // if you need auth, do it here
    clientRedis.subscribe('platformmessage_upload');

    clientRedis.on("message",(channel, message)=>{
      if(channel === 'platformmessage_upload'){
        let msg = message;
        if(typeof msg === 'string'){
          try{
            msg = JSON.parse(msg);
          }
          catch(e){
            cnosole.log(e);
          }
        }
        handlermsg(message);
      }//channel
    });
});
