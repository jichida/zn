import {getcurrentlocationfn} from '../env/geo';
//获取地理位置信息，封装为promise
let getcurrentpos =()=> {
  return new Promise(resolve => {
     getcurrentlocationfn((locz)=>{
        if(locz[0] !== 0 && locz[1] !== 0){
          resolve({lat:locz[1],lng:locz[0]});
        }
      });
  });
}

export {getcurrentpos};
