const redis = require('./src/redis/index.js');
const winston = require('./src/log/index.js');
const handlermsg = require('./src/handler/index.js');
const config = require('./src/config.js');

winston.initLog();

redis.setSubscribeHandler('platformmessage_upload',handlermsg);
