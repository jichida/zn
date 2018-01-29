
let startrouter = (app)=>{
  require('./excelupload.js')(app);
  require('./upload.js')(app);
  require('./useradmin.js')(app);
  require('./useradmincustom.js')(app);
  require('../pay/startnotify.js')(app);
};


exports.startrouter = startrouter;
