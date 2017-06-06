import config from '../config.js';
import {takeLatest, call, put } from 'redux-saga/effects';
import {
  nav_drawroute,
} from '../actions';
import {
  getstringoftime,
  getstringofdistance
} from '../util/geo.js';

let getnavdrawroute =({drawroute,startlnglat,endlnglat})=> {
  console.log('获取一个实时导航:' + drawroute);
  return new Promise(resolve => {
    if(drawroute){
      console.log('获取一个实时导航:' + JSON.stringify(startlnglat));
      console.log('获取一个实时导航:' + JSON.stringify(endlnglat));
      let driving = new window.AMap.Driving({extensions:'base'});
      // 根据起终点经纬度规划驾车导航路线
      driving.search(new window.AMap.LngLat(startlnglat.lng, startlnglat.lat),
       new window.AMap.LngLat(endlnglat.lng, endlnglat.lat),
      (status,result)=>{
            if(status === 'complete'){
              for(let route of result.routes){
                let totaldistancetxt = getstringofdistance(route.distance);
                let totaldurationtxt = getstringoftime(route.time);
                let latlngs = [];
                let instruction = '';
                for(let drivestep of route.steps){
                  if(instruction.length === 0){
                    instruction = drivestep.instruction;
                  }
                  for(let pt of drivestep.path){
                      latlngs.push({
                        lat:pt.lat,
                        lng:pt.lng
                      });
                  }
                }
                resolve({
                    drawroute,
                    totaldistancetxt,
                    totaldurationtxt,
                    latlngs,
                    instruction
                  });
                return;
              }//for(let route of result.routes){
            }//if(status === 'complete'){
          resolve({drawroute:false});
      });//driving.search
    }//if
    else{
      resolve({
        drawroute
        });
    }
  });//return new Promise(resolve => {
}//getnavdrawroute

export function* createnavdrawrouteflow(){
  yield takeLatest(`${nav_drawroute}`, function*(action) {
    let {payload} = action;
    console.log("createnavdrawrouteflow===>" + JSON.stringify(payload));
    let result = yield call(getnavdrawroute,payload);
    yield put(nav_drawroute(result));
  });
}
