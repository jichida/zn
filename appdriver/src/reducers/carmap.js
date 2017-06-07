import { createReducer } from 'redux-act';
import {
  carmap_setmapstage,
  carmap_setzoomlevel,
  selrequest,
  carmap_setmapcenter,
  acceptrequest_result,
  carmap_resetmap,
  setcurlocation,
  serverpush_triprequest,
  serverpush_triporder,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  carmap_setmapinited,
  nav_drawroute,
  serverpush_driverlocation,
  serverpush_orderprice,
  serverpush_restoreorder
} from '../actions';

import L from 'leaflet';
const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERDIRVER = 4;
const ISENABLEDDRAW_ROUTELEFT = 32;
// const ISENABLEDDRAW_ROUTEPASTPTS = 64;
// const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

const locz =[0,0];
const initial = {
    carmap: {
        isMapInited:false,
        mapstage:'联系乘客',
        zoomlevel:15,
        markerstartlatlng:L.latLng(locz[1], locz[0]),//起始位置
        markerendlatlng:L.latLng(locz[1], locz[0]),//目的位置
        driverlocation:L.latLng(locz[1], locz[0]),//司机位置
        mapcenterlocation:L.latLng(locz[1], locz[0]),//地图中心位置
        routeleftpts:[],//剩余路线
        routepastpts:[],//已经走过的路线
        enableddrawmapflag:ISENABLEDDRAW_MARKERDIRVER,//画图标志
        curmappageorder:{

        },
        curmappagerequest:{

        }
    },
};

const carmap = createReducer({
    [serverpush_restoreorder]:(state,payload)=>{
      let curmappagerequest = payload.triprequest;
      let curmappageorder = payload.triporder;
      let mapstage = state.mapstage;
      let enableddrawmapflag = 0;
      if(curmappagerequest.requeststatus === '已接单'){
        mapstage = '去接乘客';//去接乘客
      }
      else if(curmappagerequest.requeststatus === '待上车'){
        mapstage = '接到乘客';
      }
      else if(curmappagerequest.requeststatus === '行程中'){
        mapstage = '开始行程';
        enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
      }
      let markerstartlatlng = L.latLng(curmappagerequest.srcaddress.location.lat,curmappagerequest.srcaddress.location.lng);//lat,lng
      let markerendlatlng = L.latLng(curmappagerequest.dstaddress.location.lat, curmappagerequest.dstaddress.location.lng);//lat,lng
      enableddrawmapflag |= ISENABLEEDRAW_MARKERSTART;
      enableddrawmapflag |= ISENABLEDDRAW_MARKEREND;
      let mapcenterlocation = markerstartlatlng;
      return {...state,curmappagerequest,curmappageorder,mapstage,enableddrawmapflag,
      markerstartlatlng,markerendlatlng,mapcenterlocation};
    },
    [serverpush_driverlocation]:(state,payload)=>{
      let {driverlocation} = payload;
      //to test
      return {...state,driverlocation};
    },
    [serverpush_orderprice]:(state,payload)=>{
      let {realtimepricedetail} = payload;
      return {...state,curmappageorder:{
        ...state.curmappageorder,
        orderprice:realtimepricedetail.price,
        realtimepricedetail
      }};
    },
    [nav_drawroute]:(state,payload)=>{
      let {drawroute} = payload;
      let enableddrawmapflag = state.enableddrawmapflag;
      if(drawroute){
        enableddrawmapflag |= ISENABLEDDRAW_ROUTELEFT;
      }
      else{
        enableddrawmapflag &= ~ISENABLEDDRAW_ROUTELEFT;
      }
      return {...state,enableddrawmapflag};
    },
    [carmap_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [carmap_setmapcenter]:(state,mapcenterlocation)=>{
      return {...state,mapcenterlocation}
    },
    [selrequest]:(state, curreqobj) => {
      let enableddrawmapflag = state.enableddrawmapflag;
      let markerstartlatlng = L.latLng(curreqobj.srcaddress.location.lat,curreqobj.srcaddress.location.lng);//lat,lng
      let markerendlatlng = L.latLng(curreqobj.dstaddress.location.lat, curreqobj.dstaddress.location.lng);//lat,lng
      enableddrawmapflag |= ISENABLEEDRAW_MARKERSTART;
      enableddrawmapflag |= ISENABLEDDRAW_MARKEREND;
      let mapcenterlocation = markerstartlatlng;
      return { ...state,markerstartlatlng,markerendlatlng,mapcenterlocation,enableddrawmapflag};
    },
    [setcurlocation]:(state, curlocation) => {
      let enableddrawmapflag = state.enableddrawmapflag;
      let driverlocation = L.latLng([curlocation.lat, curlocation.lng]);
      enableddrawmapflag |= ISENABLEDDRAW_MARKERDIRVER;
      return { ...state,driverlocation,enableddrawmapflag};
    },
    [carmap_resetmap]:(state,initobj)=> {
        const {driverlocation,mapcenterlocation} = state;
        let enableddrawmapflag = ISENABLEDDRAW_MARKERDIRVER;
        return {...initial.carmap,driverlocation,mapcenterlocation,enableddrawmapflag};
    },
    [serverpush_triprequest]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        let enableddrawmapflag = state.enableddrawmapflag;
        if(curmappagerequest.requeststatus === '行程中'){
          enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
        }
        else{
          enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHCUR;
        }
        return { ...state,enableddrawmapflag,curmappagerequest };
    },
    [serverpush_triporder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        return { ...state, curmappageorder };
    },
    [serverpush_triprequestandorder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        let curmappagerequest = {...payload.triprequest};
        let enableddrawmapflag = state.enableddrawmapflag;
        if(curmappagerequest.requeststatus === '行程中'){
          enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
        }
        else{
          enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHCUR;
        }
        return { ...state,enableddrawmapflag, curmappageorder,curmappagerequest };
    },
    [updaterequeststatus_result]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        let enableddrawmapflag = state.enableddrawmapflag;
        if(curmappagerequest.requeststatus === '行程中'){
          enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
        }
        else{
          enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHCUR;
        }
        return { ...state,enableddrawmapflag,curmappagerequest };
    },
    // [driveroute_result]:(state,payload)=> {
    //     let mapstage = state.mapstage;
    //     if(state.mapstage === '联系乘客'){
    //       mapstage = '去接乘客';
    //     }
    //     else if(state.mapstage === '去接乘客'){
    //       mapstage = '开始行程';
    //     }
    //     return {...state,mapstage};
    // },
    [carmap_setmapstage]:(state,payload)=> {
        let mapstage = payload;
        return {...state,mapstage};
    },
    [carmap_setzoomlevel]:(state,zoomlevel)=>{
        return { ...state, zoomlevel };
    },
    [acceptrequest_result]:(state,payload)=>{
      let curmappageorder = {...payload.triporder};
      let curmappagerequest = {...payload.triprequest};
      return { ...state, curmappageorder,curmappagerequest };
    },
}, initial.carmap);

export default carmap;
