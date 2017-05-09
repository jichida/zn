
import React from 'react';

import Callcardateinput from './callcardateinput';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {getstringoftime,getstringofdistance} from '../../util/geo.js';
import {ui_setcarmap,carmap_resetmap} from '../../actions';
import {starttriprequestorder} from '../../actions/sagacallback';
import {pushrequesttodrivers_request,changestartposition} from '../../actions';

export default function CarOverlayInit(props){

    let onClickNow=(isnow)=>{
        props.dispatch(ui_setcarmap({
            ispagenow:isnow
        }));
    }

    let onClickSelDstAddress=()=>{
        props.history.push('/search/dstaddress');
    }
    let onClickSelSrcAddress=()=>{
        props.history.push('/search/srcaddress');
    };

    let onOK=()=>{
        if(!props.loginsuccess){
            //未登录，到登录页面
            let redirectAfterLogin = props.location.pathname;
            let loginroute = '/login?next=' + redirectAfterLogin;
            window.setTimeout(()=>{
                props.history.push(loginroute);
            },0);
            return;
        }
        let param = {
          triprequest:
          {
              srcaddress:props.srcaddress,
              dstaddress:props.dstaddress,
              triptype:props.triptype,
              isrealtime:props.ispagenow,
          },
          order:{
            totaldistance:props.totaldistance,
            totalduration:props.totalduration,
            resultpricedetail:props.resultpricerequest
          }
        };

        if(!props.ispagenow){//预约时间
          param.triprequest.dated_at = props.ridedatesel;
        }
        props.dispatch(starttriprequestorder(param)).then((result)=>{
            console.log("starttriprequestorder result:" + JSON.stringify(result));
            //推送给所有司机该订单
            let driveridlist =[];
            props.driverlist.forEach((driver)=>{
                driveridlist.push(driver.driverid);
            });
            props.dispatch(pushrequesttodrivers_request({
                orderid:result.triporder._id,
                requestid:result.triprequest._id,
                driveridlist:driveridlist
            }));
            props.history.push('/requestorderstarting');

        }).catch((error)=>{

        });
        //props.dispatch(starttriprequestorder_request(param));
        //可能需要封装成promise


    }

    let handleSelect=(time)=> {
        props.dispatch(ui_setcarmap({
            ridedatesel:time
        }));
    }

    //==============================================

    let onCancel=()=>{
      props.dispatch(carmap_resetmap());
        //props.onUpdatePage('restartall');
        //发送一次当前请求
        //  startlocationrequest(1000*8,this.props.typename);
        //  let zoomlevel = this.props.pagefields.zoomlevel=== 17?18:17;
        //  window.leafletmap.setView(this.props.pagefields.markerstartlatlng,zoomlevel);
    }
    //尚未叫车!
    let isgetsrc = false;
    let isgetdst = false;

    let srcname ='正在获取当前上车点...';
    let dstname = '请选择你要去的地方';

    if(props.srcaddress.addressname!=''){
        srcname = props.srcaddress.addressname;
        isgetsrc = true;
    }

    if(props.dstaddress.addressname!=''){
        dstname = props.dstaddress.addressname;
        isgetdst = true;
    }

    let btnnows = [];

    let floatcomponents;

    let isgetaddress = isgetdst&&isgetsrc;

    if(!isgetaddress){
    if(props.ispagenow){
        btnnows.push(<li key='now' className="hover">现在</li>);
        btnnows.push(<li key='date' onClick={()=>{onClickNow(false)}}>预约</li>);
    }
    else{
        btnnows.push(<li key='now' onClick={()=>{onClickNow(true)}}>现在</li>);
        btnnows.push(<li key='date' className="hover">预约</li>);
    }

        floatcomponents = (<ul className="xjl_xf_3">
            {props.ispagenow?null:<li className="text-center">
        <Callcardateinput
            value={moment(props.ridedatesel)}
            onChange={handleSelect}
        /></li>}
            <li onClick={onClickSelSrcAddress} className="cfd_icon">{srcname}</li>
            <li onClick={onClickSelDstAddress} className="zd_icon">{dstname}</li>
        </ul>);
    }
    else{
        floatcomponents =(<div className="xjl_xf_3">
            {renderHTML(props.resulthtmlstring)}
            <div className="padding"><a className="btn_a" onClick={onOK}>叫车</a></div>
            <div className="padding"><a className="btn_b" onClick={onCancel}>取消</a></div>
        </div>);
    }
    return (<div className="xjl_xf_2">
        <ul className="xjl_xf_1">
            {btnnows}
        </ul>
        {floatcomponents}
    </div>);
};
