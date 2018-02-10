const inserval_resetplatform = require('../platform/interval/interval_resetplatform');

const resetplatform = (app)=>{
  app.get('/resetplatform',(req,res)=>{
    inserval_resetplatform((err,result)=>{
      res.status(200)
          .json({
            result,
          });
    });

  });
};

module.exports = resetplatform;
