import React from 'react';
import Callcardateinput from './callcardateinput';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {getstringoftime,getstringofdistance} from '../../util/geo.js';
import {ui_setcarmap,carmap_resetmap} from '../../actions';
import {starttriprequestorder} from '../../actions/sagacallback';
import {pushrequesttodrivers_request,changestartposition} from '../../actions';
import './caroverlayinit.css';


export default function CarOverlayInit(props){

    let onClickNow=(isnow)=>{
        props.dispatch(ui_setcarmap({ispagenow:isnow}));
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
            triprequest:{
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
    }

    let handleSelect=(time)=> {
        props.dispatch(ui_setcarmap({
            ridedatesel:time
        }));
    }

    let onCancel=()=>{
        props.dispatch(carmap_resetmap());
        //props.onUpdatePage('restartall');
        //发送一次当前请求
        //startlocationrequest(1000*8,this.props.typename);
        //let zoomlevel = this.props.pagefields.zoomlevel=== 17?18:17;
        //window.leafletmap.setView(this.props.pagefields.markerstartlatlng,zoomlevel);
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

    let floatcomponents;
    let isgetaddress = isgetdst&&isgetsrc;

    return (
        <div className="caroverlayinitPage">
            {
                //这里是注释
                !isgetaddress?(
                    <ul className="listnav">
                        <li 
                            key='now' 
                            className={props.ispagenow?"hover":""}
                            onClick={()=>{onClickNow(props.ispagenow?props.ispagenow:!props.ispagenow)}}
                            >
                            现在
                        </li>
                        <li 
                            key='date'
                            className={props.ispagenow?"":"hover"}
                            onClick={()=>{onClickNow(props.ispagenow?!props.ispagenow:props.ispagenow)}}
                            >
                            预约
                        </li>
                    </ul>
                ):""
            }
            <div className="listcontent">
                {
                    //这里是注释
                    !props.ispagenow&&!isgetaddress?(
                        <div className="setordertime">
                            <span>
                                <img src="newimg/33.png" />
                                预约时间:
                            </span>
                            <Callcardateinput
                                value={moment(props.ridedatesel)}
                                onChange={handleSelect}
                            />
                        </div>
                        
                    ):""
                }
                {
                    //这里是注释
                    !isgetaddress?(
                        <div className="addresslist">
                            <li onClick={onClickSelSrcAddress} className="cfd_icon">{srcname}</li>
                            <li onClick={onClickSelDstAddress} className="color_warning"><span>{dstname}</span></li>
                        </div>
                    ):""
                }
                {
                    //这里是注释
                    isgetaddress?(
                        <div className="isGetaddress">
                            <span className="showprice">{renderHTML(props.resulthtmlstring)}</span>
                            <div className="li"><a className="btn_a" onClick={onOK}>叫车</a></div>
                            <div className="li"><a className="btn_b" onClick={onCancel}>取消</a></div>
                        </div>
                    ):""
                }
            </div>
        </div>
    );
};
