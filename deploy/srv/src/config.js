
let config =  {
  platformserverurl:'http://192.168.0.1:8081',
  secretkey:'ynyjkey',
  listenport:process.env.listenport||3006,
  rooturl:process.env.rooturl || 'http://ynyj.com28.cn',
  issmsdebug:process.env.issmsdebug || false,
  publishdirtest:'../../dist/test',
  publishdirrider:'../../dist/apprider',
  publishdirdriver:'../../dist/appdriver',
  publishdirriderpinche:'../../dist/pinchedriver',
  publishdiradmin:'../../dist/admin',
  uploaddir:'../../dist/uploader',
  uploadurl:'/uploader',
  logdir:'../../dist/log',

  CompanyId:'wangwang',
  // Address:340000,

  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  // 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog', function(err, db) {
    // ...
  mongodburl:process.env.MONGO_URL || `mongodb://localhost/ynyj`,
  defaultprofileimage:'newimg/17.png',
  faretypemap:{
       '快车':'590c8e423beda6051b5afa26',
       '出租车':'590c8e4d3beda6051b5afa27',
       '网约车':'590c8e593beda6051b5afa29',
  }
};

//
// config.setfaretypemap =  (faretypemap)=>{
//   config.faretypemap = faretypemap;
//   console.log(`setfaretypemap:${JSON.stringify(config.faretypemap )}`);
// };
//
// config.setcompanyandaddress =  (CompanyId,Address)=>{
//   config.CompanyId = CompanyId;
//   config.Address = Address;
//   console.log(`setcompanyandaddress:${CompanyId},===>${Address}`);
// };


module.exports = config;
