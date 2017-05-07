import React from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import {
  setsearchtxt,
  searchtext_request,
  placesearchresult,
  setoftenuseaddress_request,
  carmap_setstartaddress,
  carmap_setendaddress,
  driveroute_result,
  getprice_request
} from '../../actions';

import {
    Container,
} from 'amazeui-touch';

export class Search extends React.Component {

    componentWillMount () {
    }
    handleChangeSearchTxt(e){
//handler
        let searchtxt = e.target.value;
        this.props.dispatch(setsearchtxt(searchtxt));
        let param = {
            searchtext:searchtxt,
            region:this.props.curselcity.zipcode
        };

        //this.props.dispatch(searchtext_request(param));
        window.AMap.service(["AMap.PlaceSearch"], ()=> {
               var placeSearch = new window.AMap.PlaceSearch({ //构造地点查询类
                   city:param.region, //城市
                   citylimit:true,
               });
               //关键字查询
               placeSearch.search(param.searchtext,(status,result)=>{
                     console.log("status:" + status);
                     console.log("result:" + JSON.stringify(result));
                     if(status === 'complete'){
                       this.props.dispatch(placesearchresult(result));
                     }
                     //searchtext_result
               });
           });
        // if(window.geocoder){
        //   window.geocoder.setCity(param.region);
        //   window.geocoder.getLocation(param.searchtext,(status,result)=>{
        //     console.log("status:" + status);
        //     console.log("result:" + JSON.stringify(result));
        //   });
        // }
    }
    onClickSelAddress(addressitem){
        if(this.props.match.params.searchfrom === 'home' || this.props.match.params.searchfrom === 'company'){
            let data = this.props.oftenuseaddress;
            data[this.props.match.params.searchfrom] = addressitem;
            this.props.dispatch(setoftenuseaddress_request(data));
        }
        else{
            let addressname = addressitem.address;
            let location = L.latLng(addressitem.location.lat, addressitem.location.lng);//lat,lng

            if(this.props.match.params.searchfrom === 'srcaddress'){
                this.props.dispatch(carmap_setstartaddress({
                    addressname:addressname,
                    location:location
                }));

            }
            else if(this.props.match.params.searchfrom === 'dstaddress'){

                // console.log("window.amap:" + (window.amap!=undefined));
                // console.log("window.AMap:" + (window.AMap!=undefined));
                // if(window.amap){
                //     window.amap.setFitView();
                //     let zoomlevel = window.amap.getZoom();
                //     this.props.dispatch(carmap_setzoomlevel(zoomlevel));
                //     console.log("设置目的地？？zoomlevel"+zoomlevel);
                // }


                //this.props.onUpdatePage('mapcarpage_zoomlevel',zoomlevel);
                this.props.dispatch(carmap_setendaddress({
                    addressname:addressname,
                    location:location,
                    //zoomlevel:zoomlevel
                }));

                // let origin = this.props.markerstartlatlng.lng + "," + this.props.markerstartlatlng.lat;
                // let destination =  location.lng + "," + location.lat;
                // let param = {
                //     origin:origin,
                //     destination:destination,
                //     registertype:this.props.triptype
                // }
                // this.props.dispatch(driveroute_request(param));
                let driving = new window.AMap.Driving({extensions:'base'});
                // 根据起终点经纬度规划驾车导航路线
                driving.search(new window.AMap.LngLat(this.props.markerstartlatlng.lng, this.props.markerstartlatlng.lat), new window.AMap.LngLat(location.lng, location.lat),
                (status,result)=>{
                      console.log("status:" + status);
                      console.log("result:" + JSON.stringify(result));
                      if(status === 'complete'){
                        for(let route of result.routes){
                          let totaldistance = route.distance;
                          let totalduration = route.time;
                          let latlngs = [];
                          for(let drivestep of route.steps){
                            for(let pt of drivestep.path){
                                latlngs.push({
                                  lat:pt.lat,
                                  lng:pt.lng
                                });
                            }
                          }
                          this.props.dispatch(driveroute_result(
                            {
                              totaldistance,
                              totalduration,
                              latlngs
                            }));
                           this.props.dispatch(getprice_request(
                            {
                                    registertype:this.props.triptype,
                                    totaldistance,
                                    totalduration
                            }
                          ));
                          this.props.history.goBack();
                          return;
                        }
                      }

                });
                return;
            }//else if(this.props.match.params.searchfrom === 'dstaddress'){
        }
        this.props.history.goBack();
    }
    onCancel(){
        this.props.history.goBack();
    }
    onChangeCity(){
        this.props.history.push('/city');
    }
    render() {
        let homecompanybtns = [];
        if(this.props.match.params.searchfrom === 'srcaddress' || this.props.match.params.searchfrom === 'dstaddress'){
            if(this.props.oftenuseaddress.hasOwnProperty('home')){
                homecompanybtns.push(<div onClick={this.onClickSelAddress.bind(this,this.props.oftenuseaddress.home)}
                                          key="homebtn" className="col-3 padding border-l"><span className="icon icon-home text-primary fize18"></span>家庭<p className="margin-0 gray">{this.props.oftenuseaddress.home.name}</p></div>);
            }
            if(this.props.oftenuseaddress.hasOwnProperty('company')){
                homecompanybtns.push(<div onClick={this.onClickSelAddress.bind(this,this.props.oftenuseaddress.company)}
                                          key="companybtn" className="col-3 padding"><span className="icon icon-jtxx text-primary fize18"></span>公司<p className="margin-0 gray">{this.props.oftenuseaddress.company.name}</p></div>);
            }
        }

        let searchresults = [];
        for(let i=0;i<this.props.placeresult.length;i++){
                let item = this.props.placeresult[i];
                searchresults.push(<li onClick={this.onClickSelAddress.bind(this,item)}
                                       key={i}><h2>{item.address}</h2><p>{item.name}</p></li>);
        }

        return (<Container scrollable={true} fill={false}>
            <div className="select_name">
                <div onClick={this.onChangeCity.bind(this)}>{this.props.curselcity.cityname}</div>
                <label className="item-input-wrapper">
                    <input type="text" onChange={this.handleChangeSearchTxt.bind(this)}
                           value={this.props.searchtxt}/>
                </label>
                <button className="button button-clear" onClick={this.onCancel.bind(this)}>取消</button>
            </div>
            <div className="g list margin-0">{homecompanybtns}</div>
            <div className="list margin-0">
                <ul>
                    {searchresults}
                </ul>
            </div>
        </Container >);
    }
}



const mapStateToProps = ({search,city,oftenuseaddress,carmap}) => {
    const {searchtxt,placesearchresult} = search;
    let placeresult = placesearchresult.poiList.pois;
    return {searchtxt,placeresult,curselcity:city.curselcity,oftenuseaddress,triptype:carmap.triptype,markerstartlatlng:carmap.markerstartlatlng};
}


export default connect(
    mapStateToProps,
)(Search);
