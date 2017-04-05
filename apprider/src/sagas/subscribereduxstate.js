import store from '../env/store.js';
import {
  changestartposition,
  getprice_request,
  nav_drawroute
} from '../actions';
import {getcurrentlocationfn} from '../util/geo.js';
import L from 'leaflet';
import {getstringoftime,getstringofdistance} from '../util/geo.js';

const getmapstate = (state) => state.carmap;
const ISENABLEDDRAW_MARKERDIRVER = 8;

let curmapstate  ={mapstage:'pageinit'};
export function handleChange() {
  let prevmapstate = curmapstate;
  curmapstate = getmapstate(store.getState());
  //一个行程取消或结束后，改变地理位置，重新打车！
  if (curmapstate.mapstage === 'pageinit' && prevmapstate.mapstage !== 'pageinit'){
    getcurrentlocationfn((locz)=>{
       if(locz[0] !== 0 && locz[1] !== 0){
         console.log(`从mapstage切换到'pageinit'时，触发3（触发多次，取消请求，订单完成时）`);
         let srclocationstring = locz[0] + ',' + locz[1];
         store.dispatch(changestartposition({
                 location:srclocationstring
        }));
       }
     });
  }

  //打车选中目的地以后，切换坐车类型，价格动态变化
  if(curmapstate.mapstage === "pageinit" && !curmapstate.dragging){//待测试
        let sendgetpricereq = false;
        if(curmapstate.triptype !== prevmapstate.triptype){
          if(curmapstate.iswaitingforcallpage && curmapstate.resultpricerequest.totalprice > 0){
            console.log(`切换坐车类型，价格动态变化`);
            sendgetpricereq = true;
          }
      }
      if(sendgetpricereq){
          console.log(`sendgetpricereq:${sendgetpricereq},curmapstate:${curmapstate.triptype},prevmapstate:${prevmapstate.triptype}`)
          store.dispatch(getprice_request({
              registertype:curmapstate.triptype,
              totaldistance:curmapstate.totaldistance,
              totalduration:curmapstate.totalduration,
          }));
      }
    }

    //判断是否要显示司机,如果是,则判断司机位置有无变化,如变化则需要动态画线
    if((curmapstate.enableddrawmapflag & ISENABLEDDRAW_MARKERDIRVER) > 0){
      if((curmapstate.driverlocation.lng !== prevmapstate.driverlocation.lng )
      ||(curmapstate.driverlocation.lat !== prevmapstate.driverlocation.lat )){
        //地址有变化
        let drawroute = true;
        let startlnglat = curmapstate.driverlocation;
        let endlnglat;
        if(curmapstate.curmappagerequest.requeststatus === '已接单'){
           endlnglat = L.latLng(curmapstate.curmappagerequest.srcaddress.location.lat, curmapstate.curmappagerequest.srcaddress.location.lng);
        }
        else if(curmapstate.curmappagerequest.requeststatus === '行程中' ){
          endlnglat = L.latLng(curmapstate.curmappagerequest.dstaddress.location.lat, curmapstate.curmappagerequest.dstaddress.location.lng);
        }
        else{
          drawroute = false;
        }
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
                    store.dispatch(nav_drawroute({
                        totaldistancetxt,
                        totaldurationtxt,
                        latlngs,
                        instruction
                    }));
                  }//for(let route of result.routes){
                }//if(status === 'complete'){
          });//driving.search
        }//ifif(drawroute){
      }//if((curmapstate.driverlocation.lng !== prevmapstate.driverlocation.lng )
    }//if((curmapstate.enableddrawmapflag & ISENABLEDDRAW_MARKERDIRVER) > 0){
};//export function handleChange() {

//监视变化
//1.地理位置从0->有值，需要初始化地图（触发一次，同时触发3）
//2.从mapstage切换到'pageinit'时，触发3（触发多次，取消请求，订单完成时）
//3.[非条件]选定位置变化时，并去服务端获取地理位置信息,以及附近车辆信息（界面在拖动时会触发）<--changestartposition
//4.拖动坐车位置时，触发3(界面直接处理)
