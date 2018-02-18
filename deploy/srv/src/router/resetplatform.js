const inserval_resetplatform = require('../platform/interval/interval_resetplatform');
const testconnectivity = require('../../testconnectivity/index.js');


const resetplatform = (app)=>{
  app.get('/resetplatform',(req,res)=>{
    inserval_resetplatform((err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });

  });

  app.get('/starttest_connectivity',(req,res)=>{
    testconnectivity.starttest_connectivity((err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });
  });
};

module.exports = resetplatform;
