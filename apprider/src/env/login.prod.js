import * as xview from './xview/Common';

export const haveWechatApp=(fncallback)=>{
  try{
    if(!!xview){
      xview.haveWechatApp((data)=>{
        fncallback(data);
      });
    }
  }
  catch(e){
    console.log(e);
  }

}


export const loginQQ = (fncallback)=>{
    try{
      if(!!xview){
        xview.loginToTencentQQ((result)=>{
          if(typeof result === 'string'){
              result = JSON.parse(result);
          }
          //alert(JSON.stringify(result));
          result.openId = result.openId || result.openid ;
          fncallback(result);
        });
      }
    }
    catch(e){
      console.log(e);
    }
  }


  export const loginWx=(fncallback)=>{
    try{
      if(!!xview){
        xview.loginToWeixin((result)=>{
          if(typeof result === 'string'){
              result = JSON.parse(result);
          }
          // alert(`loginToWeixin返回参数==>${JSON.stringify(result)}`);
          result.openid = result.openid || result.openId ;
          fncallback(result);
        });
      }
    }
    catch(e){
      console.log(e);
    }
  }
