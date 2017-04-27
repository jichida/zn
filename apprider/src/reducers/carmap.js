import { createReducer } from 'redux-act';
import {
    carmap_setmapcenter,
    carmap_changemarkerstartlatlng,
    carmap_setdragging,
    carmap_setzoomlevel,
    carmap_setstartaddress,
    carmap_setendaddress,
    carmap_resetmap,
    carmap_setcurlocation,
    carmap_settriptype,
    getcurrentlocationandnearestdrivers_result,
    getnearestdrivers_result,
    getprice_result,
    driveroute_result,
    starttriprequestorder_result,
    canceltriprequestorder_result,
    updaterequeststatus_result,
    ui_setindexmapvisiable,
    serverpush_triprequest,
    serverpush_triporder,
    serverpush_triprequestandorder,
    carmap_setmapinited,
    nav_drawroute,
    serverpush_driverlocation,
    serverpush_orderprice,
    serverpush_restoreorder
} from '../actions';


import L from 'leaflet';

const locz = [0,0];

const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERSELF = 4;
const ISENABLEDDRAW_MARKERDIRVER = 8;
const ISENABLEDRAW_NEARBYDRIVERS = 16;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

const initial = {
    carmap: {
        isMapInited:false,
        isindexmapvisiable:true,//是否停留在首页地图(发送附近车辆请求条件)
        triptype:'出租车',//当前打车类型
        dragging:false,//是否正在拖动（拖动中避免某些特性可提升性能）
        enabledragging:true,//是否允许拖动
        mapstage:'pageinit',//指明打车阶段
        autozoomenabled:true,//是否自动缩放成合适视图
        zoomlevel:16,//缩放等级
        curlocation:L.latLng(locz[1], locz[0]),//当前位置
        markerstartlatlng:L.latLng(locz[1], locz[0]),//起始位置
        markerendlatlng:L.latLng(locz[1], locz[0]),//目的位置
        driverlocation:L.latLng(locz[1], locz[0]),//司机位置
        mapcenterlocation:L.latLng(locz[1], locz[0]),//地图中心位置
        driverlist:[],//所有司机位置
        routeleftpts:[],//剩余路线
        routepastpts:[],//已经走过的路线
        enableddrawmapflag:ISENABLEEDRAW_MARKERSTART|ISENABLEDDRAW_POPWITHSTART,//画图标志
        srcaddress:{
            addressname:'',
            location:L.latLng(locz[1], locz[0]),//起始位置
        },
        dstaddress:
        {
            addressname:'',
            location:L.latLng(locz[1], locz[0]),//起始位置
        },
        iswaitingforcallpage: false, //是否停留在叫车页面

        totaldistance: 0,//当前预估距离,单位：米【评估价格用】
        totalduration: 0,//当前预估时间，单位：秒【评估价格用】
        resulthtmlstring:"<span>正在获取价格</span>",//【停留在叫车页面时的显示】
        resultpricerequest:{//获取到价格详情的结果
            fareid:'',
            totalprice:0,
            pricestringdetail:'',
            pricestringdebug:'',
            totalkm:0,
            calcUnitPricePerMile:0,
            totalduringminute:0,
            calcUnitPricePerMinute:0
        },
        curmappageorder:{//当前订单信息

        },
        curmappagerequest:{//当前请求信息

        },
        totaldistancetxt:'',
        totaldurationtxt:'',
    },
};

const carmap = createReducer({
    [serverpush_restoreorder]:(state,payload)=>{
      let curmappagerequest = payload.triprequest;
      let curmappageorder = payload.triporder;
      let mapstage = 'pageorder';
      return {...state,curmappagerequest,curmappageorder,mapstage};
    },
    [serverpush_driverlocation]:(state,payload)=>{
      let driverlocation = L.latLng(payload.driverlocation[1], payload.driverlocation[0]);
      //显示司机位置/动态显示路线
      let enableddrawmapflag = state.enableddrawmapflag;
      enableddrawmapflag = enableddrawmapflag|ISENABLEDDRAW_MARKERDIRVER;
      return {...state,driverlocation,enableddrawmapflag};
    },
    [serverpush_orderprice]:(state,payload)=>{
      let {realtimepricedetail,triporderid} = payload;
      if(triporderid === state.curmappageorder._id){
        return {...state,curmappageorder:{
          ...state.curmappageorder,
          orderprice:realtimepricedetail.price,
          realtimepricedetail
        }};
      }
      return {...state};
    },
    [nav_drawroute]:(state,payload)=>{
      let enableddrawmapflag = state.enableddrawmapflag | ISENABLEDDRAW_POPWITHCUR |ISENABLEDDRAW_ROUTELEFT; //显示弹框信息
      let totaldistancetxt = payload.totaldistancetxt;
      let totaldurationtxt = payload.totaldurationtxt;
      let routeleftpts = payload.latlngs;
      return {...state,totaldistancetxt,totaldurationtxt,routeleftpts,enableddrawmapflag};
    },
    [carmap_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [carmap_setstartaddress]:(state,data)=>{//未叫车前改变出发地
        return {...state,
            srcaddress:{
                addressname:data.addressname,
                location:data.location
            },
            markerstartlatlng:data.location
        };
    },
    [carmap_setendaddress]:(state,data)=>{//改变目的地
        let enableddrawmapflag = state.enableddrawmapflag | ISENABLEDDRAW_MARKEREND; //显示目的地
        enableddrawmapflag &= (~ISENABLEDRAW_NEARBYDRIVERS);//不显示附近的车辆
        enableddrawmapflag &= (~ISENABLEDDRAW_POPWITHSTART);//不显示在这里上车

        return {...state,
                enableddrawmapflag,
                dstaddress:
                {
                    addressname:data.addressname,
                    location:data.location
                },
                markerendlatlng:data.location,
                iswaitingforcallpage:true,
                enabledragging:false,
                driverlist:[]
            };
    },
    [driveroute_result]:(state,result)=>{
        //获取到路线后
        const {latlngs,...rest} = result;
        let enableddrawmapflag = state.enableddrawmapflag;
        let routeleftpts = [];
        if(state.iswaitingforcallpage){//在叫车页面,画导航线
            enableddrawmapflag = enableddrawmapflag | ISENABLEDDRAW_ROUTELEFT;
            for(let curloc of latlngs){
                routeleftpts.push(L.latLng(curloc.lat, curloc.lng));
            }
        }
        return { ...state,...rest,enableddrawmapflag,routeleftpts};
    },
    [getprice_result]:(state,result)=>{
        const {resulthtmlstring,...rest} = result;
        return { ...state,resulthtmlstring,resultpricerequest:{
            ...rest
        }};
    },
    [ui_setindexmapvisiable]:(state,isindexmapvisiable)=>{
     return { ...state,isindexmapvisiable };
    },
    [serverpush_triprequest]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        return { ...state,curmappagerequest };
    },
    [serverpush_triporder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        //let carlatlng = L.latLng([curloc.driverlocation[1], curloc.driverlocation[0]]);
        return { ...state, curmappageorder };
    },
    [serverpush_triprequestandorder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        let curmappagerequest = {...payload.triprequest};
        return { ...state, curmappageorder,curmappagerequest };
    },
    [updaterequeststatus_result]:(state,result)=> {
        let curmappagerequest = {...result.triprequest};
        return {...state,curmappagerequest};
    },
    [starttriprequestorder_result]:(state,result)=> {
        let curmappageorder = {...result.triporder};
        let curmappagerequest = {...result.triprequest};
        let iswaitingforcall = false;
        return {...state,iswaitingforcall,curmappageorder,mapstage:'pageorder',curmappagerequest};
    },
    [canceltriprequestorder_result]:(state,result)=> {
        //叫车中取消叫车后,目的地不显示,路线不显示,store恢复初始化
        let {mapcenterlocation,triptype,curlocation,markerstartlatlng,srcaddress,enableddrawmapflag} = state;
        let autozoomenabled = true;
        if((enableddrawmapflag & ISENABLEDDRAW_MARKERSELF) > 0){
            enableddrawmapflag = ISENABLEEDRAW_MARKERSTART | ISENABLEDDRAW_MARKERSELF |ISENABLEDDRAW_POPWITHSTART;
        }
        else{
            enableddrawmapflag = ISENABLEEDRAW_MARKERSTART | ISENABLEDDRAW_POPWITHSTART;
        }
        mapcenterlocation = markerstartlatlng;
        return {...initial.carmap,mapcenterlocation,triptype,curlocation,markerstartlatlng,
            srcaddress,autozoomenabled};
    },
    [carmap_resetmap]:(state,initobj)=> {
        //被行程完成 和 取消叫车后调用,路线不显示,store恢复初始化
        let {mapcenterlocation,enableddrawmapflag,triptype,curlocation,markerstartlatlng,srcaddress,zoomlevel} = state;
        if((enableddrawmapflag & ISENABLEDDRAW_MARKERSELF) > 0){
            enableddrawmapflag = ISENABLEEDRAW_MARKERSTART | ISENABLEDDRAW_MARKERSELF |ISENABLEDDRAW_POPWITHSTART;
        }
        else{
            enableddrawmapflag = ISENABLEEDRAW_MARKERSTART | ISENABLEDDRAW_POPWITHSTART;
        }
        mapcenterlocation = markerstartlatlng;
        return {...initial.carmap,mapcenterlocation,enableddrawmapflag,triptype,curlocation,markerstartlatlng,
            srcaddress,zoomlevel};
    },
    [carmap_setmapcenter]:(state,mapcenterlocation)=>{
      return {...state,mapcenterlocation}
    },
    [carmap_setcurlocation]:(state,curlocation)=>{
        //获取到当前位置,显示在地图上
        let enableddrawmapflag = state.enableddrawmapflag|ISENABLEDDRAW_MARKERSELF;
        return {...state,curlocation,enableddrawmapflag};
    },
    [carmap_settriptype]:(state,triptype)=>{
        return {...state,triptype};
    },
    [carmap_changemarkerstartlatlng]: (state, markerstartlatlng) => {
        //改变起始地,初始化或拖动后调用
        return { ...state, markerstartlatlng };
    },
    [carmap_setdragging]:(state,dragging)=>{
        let enableddrawmapflag = state.enableddrawmapflag;
        let enableddrawmapflagbeforedragging = state.enableddrawmapflagbeforedragging;
        if(dragging){//拖动时隐藏
            if(!state.dragging){
                enableddrawmapflagbeforedragging = enableddrawmapflag;
            }
            enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHSTART;
            enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHCUR;
        }
        else{
            if(state.dragging){
                enableddrawmapflag = enableddrawmapflagbeforedragging;
                enableddrawmapflagbeforedragging = 0;
            }
        }
        //判断是否正在拖动
        return { ...state, dragging,enableddrawmapflag,enableddrawmapflagbeforedragging};
    },
    [carmap_setzoomlevel]:(state,zoomlevel)=>{
        //改变地图缩放等级
        let autozoomenabled = false;
        return { ...state, zoomlevel,autozoomenabled };
    },
    [getcurrentlocationandnearestdrivers_result]:(state,result)=>{
        //获取起始地址并且返回附近司机列表
        let driverlist = [];
        // for(let cardriver of result.neardrivers){
        //     let carlatlng = L.latLng([cardriver.driverlocation[1], cardriver.driverlocation[0]]);
        //     driverlist.push(carlatlng);
        // };
        //把附近司机显示在地图上
        let enableddrawmapflag = state.enableddrawmapflag|ISENABLEDRAW_NEARBYDRIVERS;
        return { ...state,
            enableddrawmapflag,
            driverlist:[...driverlist]
         };
    },
    [getnearestdrivers_result]:(state,result)=>{
        //获取起始地址并且返回附近司机列表
        let driverlist = [];
        for(let cardriver of result.neardrivers){
            let carlatlng = L.latLng([cardriver.driverlocation[1], cardriver.driverlocation[0]]);
            driverlist.push(carlatlng);
        };
        //把附近司机显示在地图上
        let enableddrawmapflag = state.enableddrawmapflag|ISENABLEDRAW_NEARBYDRIVERS;
        return { ...state,
            enableddrawmapflag,
            driverlist:[...driverlist]
         };
    },

}, initial.carmap);

export default carmap;
