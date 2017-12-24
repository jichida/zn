const config = require('../src/config.js');
const mongoose     = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);
//注意：子进程需要单独连接数据库


process.on('message', (msgobj)=> {
  //console.log("platformmessage:" + JSON.stringify(msgobj));
  let msg = msgobj.msg;
  let data = msgobj.data;

  // data:{
  //   action:actionname,//'findByIdAndUpdate',
  //   collectionname:collectionname,//'baseinfocompany',
  //   doc:retdoc
  // }

  // process.send({
  //   msg:{
  //     result:'OK',
  //   }
  // });

});
