const inserval_resetplatform = require('../platform/interval/interval_resetplatform');
const testconnectivity = require('../../testconnectivity/index.js');
const testdatalegitimacy = require('../../testdatalegitimacy/index.js');


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

  app.get('/starttest_datalegitimacy/:perpage',(req,res)=>{
    const perpage = parseInt(req.params.perpage);
    testdatalegitimacy.starttest_datalegitimacy({perpage},(err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });
  });

  app.get('/starttest_datalegitimacy_interval/:perpage',(req,res)=>{
    const perpage = parseInt(req.params.perpage);
    testdatalegitimacy.starttest_datalegitimacy_interval({perpage},(err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });
  });

  app.get('/starttest_datalegitimacy_interval_getstatus',(req,res)=>{
    testdatalegitimacy.starttest_datalegitimacy_interval_getstatus((err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });
  });
  //http://api.tczncx.com/starttest_resetuploaded
  app.get('/starttest_resetuploaded',(req,res)=>{
    testdatalegitimacy.starttest_resetuploaded((err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });
  });
};

module.exports = resetplatform;
