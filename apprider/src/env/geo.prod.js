/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import {geographyLocationCallbackMethod} from './xview/Common';

let locationsz =[0,0];

export const getcurrentlocationfn = (fncallback)=> {
    window.setTimeout(()=>{
        try{
              geographyLocationCallbackMethod((data)=>{
                //alert(JSON.stringify(data));
                if(typeof data=='string'){
                  data=JSON.parse(data);
                }
                locationsz = [data.longitude,data.latitude];
                fncallback(locationsz);
            })
        }catch(e){
          alert(`获取地理位置失败(getcurrentlocationfn)
          ${JSON.stringify(e)}`);
            fncallback(locationsz);
        }
    },0);
}
