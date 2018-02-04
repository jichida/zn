

export const opendownloadurl=(url)=>{
  if(url.indexOf("http://")===-1){
    url="http://"+url;
  }
  console.log(`跳转到地址:${url}`);
}
