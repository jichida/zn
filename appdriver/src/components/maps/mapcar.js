import React from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';

import {
  carmap_setzoomlevel,
  carmap_setmapcenter,
  driveroute_request,
  carmap_setmapinited
} from '../../actions';
import Popinfotrip from './popinfocar';

//import Popinfowaiting from './popinfolookingcar';

const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERDIRVER = 4;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHCUR  = 256;

let markerstart,markerend,markerdriver,polylineleft,polylinepast;

window.initamaploaded = false;
export class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount () {
    window.amap = null;
    console.log('地图---->componentWillMount---------');
  }
  componentWillUnmount(){
    console.log('地图---->componentWillUnmount---------');
  }
  componentDidMount () {
    console.log('地图---->componentDidMount---------' + this.props.isMapInited);
    const {isMapInited,mapcenterlocation,zoomlevel} = this.props;
    if(isMapInited && mapcenterlocation.lng!==0 && !window.amap ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amap = new window.AMap.Map("gaodemap", {
            center: center,
            zoom:zoomlevel,
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
        });
        window.amap.on('dragstart', (e)=> {
            this.onDragStart();
        });
        window.amap.on('dragging', (e)=> {
            this.onDragging();
        });
        window.amap.on('dragend', (e)=> {
            this.onDragEnd();
        });
        window.amap.on('zoomend', (e)=> {
            this.onZoomend();
        });

        window.geocoder = new window.AMap.Geocoder({
          radius: 1000 //范围，默认：500
        });
      }
  }
  componentWillReceiveProps(nextProps) {
    console.log('地图---->componentWillReceiveProps---------' + nextProps.isMapInited);
    const {isMapInited,mapcenterlocation,zoomlevel} = nextProps;
    if(isMapInited && mapcenterlocation.lng!==0){
      if(!window.amap){
        let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
        window.amap = new window.AMap.Map("gaodemap", {
            center: center,
            zoom:zoomlevel,
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
        });
        window.amap.on('dragstart', (e)=> {
            this.onDragStart();
        });
        window.amap.on('dragging', (e)=> {
            this.onDragging();
        });
        window.amap.on('dragend', (e)=> {
            this.onDragEnd();
        });
        window.amap.on('zoomend', (e)=> {
            this.onZoomend();
        });
     }
    }
   }

   onDragging(){
   }
    onDragStart(){
      //  this.props.dispatch(carmap_setdragging(true));
    }

   onDragEnd(){
         const getleafletpos = (curlocation)=>{
            return L.latLng(curlocation.lat, curlocation.lng);//lat,lng
         };
         let centerlatlng = getleafletpos(window.amap.getCenter());
         this.props.dispatch(carmap_setmapcenter(centerlatlng));
     }
    onZoomend(){
        this.props.dispatch(carmap_setzoomlevel(window.amap.getZoom()));
    }
    shouldComponentUpdate(nextprop){
 //componentDidUpdate(){
     const {enableddrawmapflag,markerstartlatlng,markerendlatlng,
     driverlocation,routeleftpts,routepastpts} = nextprop;
     if(window.amap){
         const isenableddrawmapflag = (flag)=>{
             return (enableddrawmapflag & flag)>0;
         }
         const getamppos = (curloc)=>{
             return [curloc.lng,curloc.lat];
         };
         const getAMappos = (markerstartlatlng)=>{
             return new window.AMap.LngLat(markerstartlatlng.lng,markerstartlatlng.lat);
         }
         //开始位置
         const showmarker =(enableddrawflag,marker,markerloc,image)=>{
             if (marker) {
                 marker.setMap(null);
             }
             if(isenableddrawmapflag(enableddrawflag)) {//显示
                 if (!marker) {
                     let startIcon = new window.AMap.Icon({
                         image: image,
                         imageSize: new window.AMap.Size(25, 31)
                     });
                     let markstartprops = {
                         position: getamppos(markerloc),
                         icon: startIcon,
                     };
                     marker = new window.AMap.Marker(markstartprops);
                 }
                 else {
                     marker.setPosition(getamppos(markerloc));
                 }
                 marker.setMap(window.amap);
             }
             return marker;
         }

         //标记点：起始，目的地，我的当前位置，司机位置
         markerstart = showmarker(ISENABLEEDRAW_MARKERSTART,markerstart,markerstartlatlng,'images/start.png');
         markerend = showmarker(ISENABLEDDRAW_MARKEREND,markerend,markerendlatlng,'images/end.png');
         markerdriver = showmarker(ISENABLEDDRAW_MARKERDIRVER,markerdriver,L.latLng(driverlocation.lat,driverlocation.lng),'images/mycar.png');

         //画线
         const showpolyline =(enableddrawflag,polyline,polylineprops)=> {
             if(polyline){
                 polyline.setMap(null);
             }
             if(isenableddrawmapflag(enableddrawflag)) {//显示
                 //重新画了！
                 polyline = new window.AMap.Polyline(polylineprops);
                 polyline.setMap(window.amap);
             }
             return polyline;
         }
         //驾车路线（导航的路线）
         let leftpts = [];
         for(let pt of routeleftpts){
             leftpts.push(getAMappos(pt));
         }
         let routeleftprops ={
             path: leftpts,//设置多边形边界路径
             strokeColor: "#FF0000", //线颜色
             strokeOpacity: 1, //线透明度
             strokeWeight: 4,    //线宽
             fillColor: "#1791fc", //填充色
             fillOpacity: 0.35//填充透明度
         };
         polylineleft = showpolyline(ISENABLEDDRAW_ROUTELEFT,polylineleft,routeleftprops);
         //驾车路线（走过的路线）
         let pastpts = [];
         for(let pt of routepastpts){
             pastpts.push(getAMappos(pt));
         }
         let routelpastprops ={
             path: pastpts,//设置多边形边界路径
             strokeColor: "#FF33FF", //线颜色
             strokeOpacity: 0.2, //线透明度
             strokeWeight: 3,    //线宽
             fillColor: "#1791fc", //填充色
             fillOpacity: 0.35//填充透明度
         };
         polylinepast = showpolyline(ISENABLEDDRAW_ROUTEPASTPTS,polylinepast,routelpastprops);
     }


     return true;//地图不刷新，直接操作了！
 }


  render() {
      const isenableddrawmapflag = (flag)=>{
          //return true;
          return (this.props.enableddrawmapflag & flag)>0;
      };

      console.log('地图---->render---------');

        let pophtmlofstartlatlng = null;
        let positiondiv = [0,0];
        if(window.amap){
          if(isenableddrawmapflag(ISENABLEDDRAW_POPWITHCUR)){
            //行程中生效！
            const {totaldistancetxt,totaldurationtxt} = this.props.driveroute;
            const {realtimepricedetail} = this.props.curmappageorder;
            let pixel = window.amap.lnglatTocontainer([this.props.driverlocation.lng, this.props.driverlocation.lat]);
            positiondiv = [pixel.getX(),pixel.getY()];
            pophtmlofstartlatlng = <Popinfotrip positiondiv={positiondiv}
            totaldistancetxt={totaldistancetxt}
            totaldurationtxt={totaldurationtxt}
            realtimepricedetail={realtimepricedetail}
            />;
          }
          console.log(`当前位置像素坐标${positiondiv[0]},${positiondiv[0]}`);
        }

    return (
      <div style={{
        width: '100%',
        height: (window.innerHeight-92)+"px",
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
      }}>
      {pophtmlofstartlatlng}
        <div  id="gaodemap"  style={{
                  width: '100%',
                  height: '100%',
                  position:'absolute',
                  left:"0",
                  top: '0',
                  zIndex:1
                }} />
      </div>
    );
  }
}

const mapStateToProps = ({operate,carmap,driveroute}) => {
  let curlocation = operate.curlocation;
  let routeleftpts = driveroute.latlngs;
  return {...carmap,curlocation,routeleftpts,driveroute};
}

export default connect(
  mapStateToProps
)(Page);
