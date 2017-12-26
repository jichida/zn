const express = require('express');
const _ = require('lodash');
const bodyParser = require("body-parser");
const map_platformfn = require('./src/getmapfn');
let winston = require('./src/log/log.js');
let app = express();

winston.initLog();

const startmodule = (app)=>{
  _.map(map_platformfn,(v,k)=>{
    app.post(v.uri,(req,res)=>{
      console.log(`get IPCType==>${v.IPCType}`);
      const actiondata = req.body;
      winston.getlog().info(actiondata);
      res.status(200)
          .json({
            result:'OK',
          });
      // winston.getlog().error(`类型==>${v.IPCType},
      //   路径:${v.uri}
      //   ${JSON.stringify(actiondata)}`);
      // console.log(`get body==>\n${JSON.stringify(actiondata)}`);
    });
  });

};

const startsrv = ()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });

  app.use((req, res, next)=> {
      console.log('req.url:' + req.url);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });


  startmodule(app);

};

startsrv();
app.listen(8080);
