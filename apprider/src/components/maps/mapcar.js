import React from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import {
  carmap_setstartaddress,
  carmap_setdragging,
  carmap_changemarkerstartlatlng,
  carmap_setzoomlevel,
  carmap_setmapcenter,
  carmap_setmapinited
} from '../../actions';
import {changestartposition} from '../../actions';
import Popinfotrip from './popinfocar';
import Popinfowaiting from './popinfolookingcar';
import Script from 'react-load-script';


const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERSELF = 4;
const ISENABLEDDRAW_MARKERDIRVER = 8;
const ISENABLEDRAW_NEARBYDRIVERS = 16;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

let markerdriverlist = [];
let markerstart,markerend,markerself,markerdriver,polylineleft,polylinepast;

window.initamaploaded = false;
class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    window.amap = null;
    this.props.dispatch(carmap_setmapinited(window.initamaploaded));
    console.log('地图---->componentWillMount---------');
  }
  componentWillUnmount(){
    console.log('地图---->componentWillUnmount---------');
  }
  componentDidMount () {
    console.log('地图---->componentDidMount---------');
    const {mapcenterlocation,zoomlevel} = this.props;
    if(this.props.isMapInited && mapcenterlocation.lng!==0 && !window.amap ){
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
    const {mapcenterlocation,zoomlevel} = nextProps;
    if(nextProps.isMapInited && mapcenterlocation.lng!==0){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      if(!window.amap){
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

        window.geocoder.getAddress(center, (status, result)=> {
            console.log("status:" + status);
            console.log("result:" + JSON.stringify(result));
            if (status === 'complete' && result.info === 'OK') {
               //geocoder_CallBack(result);
               let addressname = result.regeocode.formattedAddress;
               let location = mapcenterlocation;
               this.props.dispatch(carmap_setstartaddress({addressname,location}));
            }
       });

      }
      else{
        if(zoomlevel !== this.props.zoomlevel){
          window.amap.setZoom(zoomlevel);
        }

        if(mapcenterlocation.lng !== this.props.mapcenterlocation.lng ||
        mapcenterlocation.lat !== this.props.mapcenterlocation.lat){
          window.amap.setCenter(center);
        }

      }

    }
  }
    onDragging(){
        // const getleafletpos = (curlocation)=>{
        //    return L.latLng(curlocation.lat, curlocation.lng);//lat,lng
        // };
        //  let centerlatlng = getleafletpos(window.amap.getCenter());
        //  if(this.props.enabledragging){
        //      this.props.dispatch(carmap_changemarkerstartlatlng(centerlatlng));
        // }
        // this.props.dispatch(carmap_setmapcenter(centerlatlng));
    }
    onDragStart(){
        this.props.dispatch(carmap_setdragging(true));
    }


    onDragEnd(){
        const getleafletpos = (curlocation)=>{
           return L.latLng(curlocation.lat, curlocation.lng);//lat,lng
        };
        this.props.dispatch(carmap_setdragging(false));
        let centerlatlng = getleafletpos(window.amap.getCenter());
        if(this.props.enabledragging){
            let markerstartlatlng = centerlatlng;
            this.props.dispatch(carmap_changemarkerstartlatlng(centerlatlng));
            let srclocationstring = markerstartlatlng.lng+"," +markerstartlatlng.lat;
            console.log(`拖动坐车位置时，触发3(界面直接处理)`);
            this.props.dispatch(changestartposition({
                location:srclocationstring
            }));
            let center = new window.AMap.LngLat(centerlatlng.lng,centerlatlng.lat);
            window.geocoder.getAddress(center, (status, result)=> {
                console.log("status:" + status);
                console.log("result:" + JSON.stringify(result));
                if (status === 'complete' && result.info === 'OK') {
                  let addressname = result.regeocode.formattedAddress;
                  let location = centerlatlng;
                  this.props.dispatch(carmap_setstartaddress({addressname,location}));
                }
           });
        }
        this.props.dispatch(carmap_setmapcenter(centerlatlng));
    }
    onZoomend(){
        this.props.dispatch(carmap_setzoomlevel(window.amap.getZoom()));
   }


    // shouldComponentUpdate(nextprop){
    //   return true;
    // }
    shouldComponentUpdate(nextprop){
    //componentDidUpdate(){
        const {enableddrawmapflag,markerstartlatlng,markerendlatlng,curlocation,
        driverlocation,driverlist,routeleftpts,routepastpts,enabledragging} = nextprop;
        if(window.amap){
            const isenableddrawmapflag = (flag)=>{
                if(flag === ISENABLEEDRAW_MARKERSTART && enabledragging){
                  //地图上移动起始位置时，为提升效率，不显示覆盖物（避免实时计算位置导致性能问题）
                  return false;//显示div,不显示覆盖物！
                }
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
                            imageSize: new window.AMap.Size(25, 45)
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
            markerself = showmarker(ISENABLEDDRAW_MARKERSELF,markerself, L.latLng(curlocation.lat, curlocation.lng),'images/me.png');
            markerdriver = showmarker(ISENABLEDDRAW_MARKERDIRVER,markerdriver,L.latLng(driverlocation.lat,driverlocation.lng),'images/mycar.png');
            //附近车辆／先清空
            for(let marker of markerdriverlist){
                marker.setMap(null);
            }
            markerdriverlist = [];
            if(isenableddrawmapflag(enableddrawmapflag)) {//显示
                if (driverlist.length > 0) {
                    let carIcon = new window.AMap.Icon({
                        image: 'images/mycar.png',
                        imageSize: new window.AMap.Size(20, 30)
                    });
                    for (let curloc of driverlist){
                        let drivercarprops = {
                            position:[curloc.lng,curloc.lat],
                            icon:carIcon
                        };
                        let marker = new window.AMap.Marker(drivercarprops);
                        marker.setMap(window.amap);
                        markerdriverlist.push(marker);
                    }
                }
            }
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



    handleScriptCreate() {
    }

    handleScriptError() {
    }

    handleScriptLoad() {
      window.init = ()=>{
        this.props.dispatch(carmap_setmapinited(true));
        window.initamaploaded = true;
        console.log("windowAmap:" + window.AMap);

      };
    }


    render() {
      console.log('地图---->render---------');
      let scriptco = <Script
          url="http://webapi.amap.com/maps?v=1.3&key=788e08def03f95c670944fe2c78fa76f&callback=init&plugin=AMap.Geocoder,AMap.Driving"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
          />;
        if(this.props.isMapInited){
          scriptco = null;
        }


        const getamppos = (curloc)=>{
            return {longitude:curloc.lng, latitude:curloc.lat};
        };
        const isenableddrawmapflag = (flag)=>{
            //return true;
            return (this.props.enableddrawmapflag & flag)>0;
        };
        // const events = {
        //     created: (ins) => {
        //         window.amap = ins;
        //         console.log("created------->");
        //         window.geocoder = new new AMap.Geocoder({
        //           city: "010", //城市，默认：“全国”
        //           radius: 1000 //范围，默认：500
        //         });
        //     },
        //     dragstart:()=>{this.onDragStart();},
        //     dragging:()=>{this.onDragging();},
        //     dragend:()=>{this.onDragEnd();},
        //     zoomend:()=>{this.onZoomend();}
        // }
        //console.log(`画坐标${marks.length},画折线${polylines.length}`);
        let pophtmlofstartlatlng = null;
        let positiondiv = [0,0];
        if(window.amap){
          if(isenableddrawmapflag(ISENABLEDDRAW_POPWITHSTART)){
            let pixel = window.amap.lnglatTocontainer([this.props.markerstartlatlng.lng, this.props.markerstartlatlng.lat]);
            positiondiv = [pixel.getX()-85,pixel.getY()-70];
            pophtmlofstartlatlng = <Popinfowaiting positiondiv={positiondiv} />;
          }
          console.log(`起始位置像素坐标${positiondiv[0]},${positiondiv[0]}`);
          if(isenableddrawmapflag(ISENABLEDDRAW_POPWITHCUR)){//driverlocation
            let pixel = window.amap.lnglatTocontainer([this.props.driverlocation.lng, this.props.driverlocation.lat]);
            positiondiv = [pixel.getX()-110,pixel.getY()-70];
            const {totaldistancetxt,totaldurationtxt} = this.props;
            const {requeststatus} = this.props.curmappagerequest;
            if(requeststatus === '行程中'){
              const {realtimepricedetail} = this.props.curmappageorder;
              pophtmlofstartlatlng = <Popinfotrip
                positiondiv={positiondiv}
                totaldistancetxt={totaldistancetxt}
                totaldurationtxt={totaldurationtxt}
                realtimepricedetail={realtimepricedetail}
                triporderid={this.props.curmappageorder._id}
                history={this.props.history}
                />;
            }
            else{
              pophtmlofstartlatlng = <Popinfotrip
                positiondiv={positiondiv}
                totaldistancetxt={totaldistancetxt}
                totaldurationtxt={totaldurationtxt}
                triporderid={this.props.curmappageorder._id}
                history={this.props.history}
                />;
            }
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
                {this.props.enabledragging?
                <img src='images/start.png' style={{
                    zIndex:2,
                    width:'25px',
                    height:'45px'
                }}/>:null}
                {pophtmlofstartlatlng}

                <div  id="gaodemap"  style={{
                  width: '100%',
                  height: '100%',
                  position:'absolute',
                  left:"0",
                  top: '0',
                  zIndex:1
                }} />

                {scriptco}
            </div>
        );
    }
}

const mapStateToProps = ({carmap}) => {
    return {...carmap};
}

export default connect(
    mapStateToProps,
)(Page);
