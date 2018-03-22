const srvhttp = require('./src/srvrestfulapi.js');
const srvwebsocket = require('./src/srvwebsocket.js');
const srvsystem = require('./src/srvsystem.js');
const redis = require('./src/redis/index.js');
const config = require('./src/config');
const PubSub = require('pubsub-js');
const mongoose     = require('mongoose');
const testconnectivity = require('./testconnectivity/index.js');


mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    socketOptions: {
      // This option is on by default, but why not set it explicitly
      autoReconnect: true
    },
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  })

console.log(`rooturl:${config.rooturl}`);
console.log(`issmsdebug:${config.issmsdebug}`);

srvsystem.job();
srvwebsocket.startsrv(srvhttp.startsrv());


redis.setSubscribeHandler('platformmessage_upload_callback',testconnectivity.platformmessage_upload_callback);

PubSub.subscribe('platformmessage_upload', ( msg, data )=>{
  // console.log("platformmessage:" + JSON.stringify(data));
  redis.publish('platformmessage_upload',data)
  // process_request.send({
  //   msg:msg,
  //   data:data
  // });
});

// process_request.on('message', (res)=> {
//   console.log('message_reply:' + JSON.stringify(res));
// });
