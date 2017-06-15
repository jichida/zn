import React from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import {
    carmap_setstartaddress,
    carmap_setdragging,
    carmap_changemarkerstartlatlng,
    carmap_setzoomlevel,
    carmap_setmapcenter,
    carmap_setmapinited,

    carmap_dragend,
    carmap_getaddr,
    carmap_dragging
} from '../../actions';
import {changestartposition} from '../../actions';
import Popinfotrip from './popinfocar';
import Popinfowaiting from './popinfolookingcar';

import "../../../public/newcss/mapcontainer.css";


import _ from 'lodash';

const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERSELF = 4;
const ISENABLEDDRAW_MARKERDIRVER = 8;
// const ISENABLEDRAW_NEARBYDRIVERS = 16;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

let markerdriverlist = [];
let markerstart,markerend,markerself,markerdriver,polylineleft,polylinepast,infoWindow;

window.initamaploaded = false;
class Page extends React.Component {
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
        this.props.dispatch(carmap_getaddr(mapcenterlocation));
      //   window.geocoder.getAddress(center, (status, result)=> {
      //       console.log("status:" + status);
      //       console.log("result:" + JSON.stringify(result));
      //       if (status === 'complete' && result.info === 'OK') {
      //          //geocoder_CallBack(result);
      //          let addressname = result.regeocode.formattedAddress;
      //          let location = mapcenterlocation;
      //          this.props.dispatch(carmap_setstartaddress({addressname,location}));
      //       }
      //  });

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
        this.props.dispatch(carmap_dragging({markerstart}));
    }
    onDragStart(){
        this.props.dispatch(carmap_setdragging(true));
    }


    onDragEnd(){
      this.props.dispatch(carmap_dragend());
        // const getleafletpos = (curlocation)=>{
        //    return L.latLng(curlocation.lat, curlocation.lng);//lat,lng
        // };
        // this.props.dispatch(carmap_setdragging(false));
        // let centerlatlng = getleafletpos(window.amap.getCenter());
        // if(this.props.enabledragging){
        //     let markerstartlatlng = centerlatlng;
        //     this.props.dispatch(carmap_changemarkerstartlatlng(centerlatlng));
        //     let srclocationstring = markerstartlatlng.lng+"," +markerstartlatlng.lat;
        //     console.log(`拖动坐车位置时，触发3(界面直接处理)`);
        //     this.props.dispatch(changestartposition({
        //         location:srclocationstring
        //     }));
        //     let center = new window.AMap.LngLat(centerlatlng.lng,centerlatlng.lat);
        //     window.geocoder.getAddress(center, (status, result)=> {
        //         console.log("status:" + status);
        //         console.log("result:" + JSON.stringify(result));
        //         if (status === 'complete' && result.info === 'OK') {
        //           let addressname = result.regeocode.formattedAddress;
        //           let location = centerlatlng;
        //           this.props.dispatch(carmap_setstartaddress({addressname,location}));
        //         }
        //    });
        // }
        // this.props.dispatch(carmap_setmapcenter(centerlatlng));
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
                // if(flag === ISENABLEEDRAW_MARKERSTART && enabledragging){
                //   //地图上移动起始位置时，为提升效率，不显示覆盖物（避免实时计算位置导致性能问题）
                //   return false;//显示div,不显示覆盖物！
                // }
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
                    marker.hide();
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
                    marker.show();
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
            _.map(markerdriverlist,(marker)=>{
              marker.setMap(null);
            });

            markerdriverlist = [];
            if(isenableddrawmapflag(enableddrawmapflag)) {//显示
                if (driverlist.length > 0) {
                    let carIcon = new window.AMap.Icon({
                        image: 'images/mycar.png',
                        imageSize: new window.AMap.Size(20, 30)
                    });

                    _.map(driverlist,(curloc)=>{
                      let drivercarprops = {
                          position:[curloc.lng,curloc.lat],
                          icon:carIcon
                      };
                      let marker = new window.AMap.Marker(drivercarprops);
                      marker.setMap(window.amap);
                      markerdriverlist.push(marker);
                    });
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
            _.map(routeleftpts,(pt)=>{
              leftpts.push(getAMappos(pt));
            });
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
            _.map(routepastpts,(pt)=>{
              pastpts.push(getAMappos(pt));
            });

            let routelpastprops ={
                path: pastpts,//设置多边形边界路径
                strokeColor: "#FF33FF", //线颜色
                strokeOpacity: 0.2, //线透明度
                strokeWeight: 3,    //线宽
                fillColor: "#1791fc", //填充色
                fillOpacity: 0.35//填充透明度
            };
            polylinepast = showpolyline(ISENABLEDDRAW_ROUTEPASTPTS,polylinepast,routelpastprops);

            if(!!infoWindow){
              infoWindow.setMap(null);
            }
            if(isenableddrawmapflag(ISENABLEDDRAW_POPWITHCUR)){
              let info = [];
              const {totaldistancetxt,totaldurationtxt} = nextprop;

              info.push(`<div className="mapCoverInfo" >`);
              info.push(`<div className="infoCont">`);
              info.push(`<div className="info">`);
              info.push(`<p>距离终点<span>${totaldistancetxt}</span></p>`);
              info.push(`<p>预计行驶<span>${totaldurationtxt}</span></p>`);
              info.push(`</div>`);
              info.push(`<div className="price">`);
              const {requeststatus} = nextprop.curmappagerequest;
              if(requeststatus === '行程中'){
                const {realtimepricedetail} = nextprop.curmappageorder;
                info.push(`<span>${realtimepricedetail.price}元</span>`);
              }
              info.push(`</div>`);
              info.push(`</div>`);
              info.push(`<div className="point"></div>`);
              info.push(`</div>`);
              infoWindow = new window.AMap.InfoWindow({
                  content: info.join("<br>")  //使用默认信息窗体框样式，显示信息内容
              });
              infoWindow.open(window.amap, [this.props.driverlocation.lng, this.props.driverlocation.lat]);
            }
        }


        return true;//地图不刷新，直接操作了！
    }




    render() {
        console.log('地图---->render---------');
        return (
            <div className="mapcontainer">
                <div id="gaodemap" />
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
