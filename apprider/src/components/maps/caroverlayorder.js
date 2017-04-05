import React from 'react';
import {Rating} from 'belle';
import {canceltriprequestorder} from '../../actions/sagacallback';
import {changestartposition} from '../../actions';

export function CarOverlayOrder(props) {
    if(props.curmappageorder.hasOwnProperty('_id')){
        let requestobj = props.curmappagerequest;
        let orderobj = props.curmappageorder;
        let driverinfo = requestobj.driveruserinfo || {
                drivername:'无名司机',
                carid:'隐藏车牌',
                carname:'匿名车辆',
                starnum:5
            };
        let cancelrequest =()=>{
          props.dispatch(canceltriprequestorder({
            triporderid:props.curmappageorder._id,
            triprequestid:props.curmappagerequest._id
          })).then((result)=>{
            let srclocationstring = props.curlocation.lng + ',' + props.curlocation.lat;
            props.dispatch(changestartposition({
                  location:srclocationstring
            }));//重新发送一次附近请求

          });
        }

        let getrequestingcomponents =()=>{
            return (<ul className="xjl_ddjj">
                <li><div className="xjl_ddjj_ab">您好正在为您寻找司机，请等待....</div></li>
                <li><div className="btn_a" onClick={cancelrequest} > 取消请求 </div></li>
            </ul>);
        };

        let getrequestoverwaitingpickup=()=>{
            //stoplocationrequest();//已经接单了!!
            return  (<ul className="xjl_ddjj" >
                <li><div className="xjl_ddjj_top"><img src="images/user.jpg"  alt="img"/><div className="xjl_ddjj_main"><div>
                    <h2>{driverinfo.drivername}~{driverinfo.carid}</h2><p>{driverinfo.carname}</p>
                    <div className="xjl_ddjj_bottom">
                        <Rating defaultValue={driverinfo.starnum} disabled={true}/>
                    </div></div></div>

                    <div className="xjl_ddjj_right">
                        <a href="tel;400-1000-000">
                            <img src="images/dh.png" alt="img"/></a></div></div>
                </li>
                <li><div className="xjl_ddjj_ab">司机即将到达，请提前到路边等待，若您迟到，司机可无责任取消订单。</div></li>
                <li><div className="btn_a" onClick={cancelrequest} > 取消请求 </div></li>
            </ul>);
        };

        let getrequestoverwaitinggetin=()=>{
            return (<ul className="xjl_ddjj">
                <li><div className="xjl_ddjj_top"><img src="/images/user.jpg"  alt="img"/><div className="xjl_ddjj_main"><div>
                    <h2>{driverinfo.drivername}~{driverinfo.carid}</h2><p>{driverinfo.carname}</p>
                    <div className="xjl_ddjj_bottom">
                        <Rating defaultValue={driverinfo.starnum} disabled={true}/>
                    </div></div></div><div className="xjl_ddjj_right"><a href="tel;400-1000-000">
                    <img src="/images/dh.png"  alt="img"/></a></div></div>
                </li>
                <li><div className="xjl_ddjj_ab">司机已到达，请尽快上车，若您未在5分钟内上车，司机可无责任取消订单。</div></li>
                <li><div className="btn_a" onClick={cancelrequest} > 取消请求 </div></li>
            </ul>);
        };
        let gettripping =()=>{
            return  (<ul className="xjl_ddjj">
                <li><div className="xjl_ddjj_top"><img src="images/user.jpg" alt='user'/><div className="xjl_ddjj_main"><div>
                    <h2>{driverinfo.drivername}~{driverinfo.carid}</h2><p>{driverinfo.carname}</p><div className="xjl_ddjj_bottom">
                    <Rating defaultValue={driverinfo.starnum} disabled={true}/>
                </div></div></div></div>
                </li>
                <li><div className="xjl_ddjj_ab">行程开始，祝您一路好心情。</div></li>
            </ul>);
        }
        if(requestobj.requeststatus === '请求中'){
            return getrequestingcomponents();
        }
        if(requestobj.requeststatus === '已接单'){
            return getrequestoverwaitingpickup();
        }
        if(requestobj.requeststatus === '待上车'){
            return getrequestoverwaitinggetin();
        }
        if(requestobj.requeststatus === '行程中'){
            return gettripping();
        }
        if(requestobj.requeststatus === '行程完成'){

        }
    }
    return (<div>请稍后</div>);
};

export default CarOverlayOrder;
