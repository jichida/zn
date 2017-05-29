/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import * as xview from './xview/Common';

let locationsz =[0,0];

export const getcurrentlocationfn = (fncallback)=> {
    window.setTimeout(()=>{
        try{
            xview.geographyLocationCallbackMethod((data)=>{
                //alert(JSON.stringify(data));
                locationsz = [data.longitude,data.latitude];
                fncallback(locationsz);
            })
        }catch(e){
            alert(JSON.stringify(e));
            fncallback(locationsz);
        }
    },0);
}
