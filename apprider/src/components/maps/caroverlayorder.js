import React from 'react';
import { connect } from 'react-redux';
import {Rating} from 'belle';
import {canceltriprequestorder} from '../../actions/sagacallback';
import {changestartposition} from '../../actions';
import "../../../public/newcss/caroverlay.css";
import StarRatingComponent from 'react-star-rating-component';

let PageDriverHead =(props)=>(
    <div className="userorderinfoPage ">
        <div className="kuaicheinfo orderinfohead">
            <div className="driver">
                <img src="images/user.jpg" className="avatar"/>
                <div className="info">
                    <div className='star'>
                        <span>赵师傅</span>
                        <StarRatingComponent 
                            name="star" 
                            editing={false}
                            starCount={5}
                            value={4}
                            emptyStarColor="#EEEEEE"
                        />
                    </div>
                    <div>
                        白色现代.苏A99999
                    </div>
                </div>
                <a 
                    href="tel:13888888888"
                    className="call">
                    <img src="newimg/20.png" />
                    联系TA
                </a>
            </div>
            <div className="topicinfo">
                <div><img src="newimg/37.png" width={27}/>{props.topicinfo}</div>
            </div>
        </div>
    </div>

)

export class Page extends React.Component {

    render(){
        const {
            curmappageorder,
            curmappagerequest,
            curlocation,
            dispatch,
        } = this.props;
        if(curmappageorder.hasOwnProperty('_id')){
            let requestobj = curmappagerequest;
            let orderobj = curmappageorder;
            let driverinfo = requestobj.driverinfo || {
                DriverName:'无名司机',
                VehicleNo:'隐藏车牌',
                PlateColor:'',
                Brand:'',
                Model:'匿名车辆',
                starnum:5
            };
            let cancelrequest =()=>{
                dispatch(canceltriprequestorder({
                    triporderid:curmappageorder._id,
                    triprequestid:curmappagerequest._id
                })).then((result)=>{
                    let srclocationstring = curlocation.lng + ',' + curlocation.lat;
                    dispatch(changestartposition({
                        location:srclocationstring
                    }));//重新发送一次附近请求
                });
            }

            let getrequestingcomponents =()=>{
                  return (
                    <div className="loadingdriver">
                        <ul>
                            <li>您好正在为您寻找司机，请等待....</li>
                        </ul>
                    </div>
                );
            };

            let getrequestoverwaitingpickup=()=>{
                return  (
                    <PageDriverHead topicinfo="司机即将到达，请提前到路边等待" />
                );
            };

            let getrequestoverwaitinggetin=()=>{
                return  (
                    <PageDriverHead topicinfo="司机已到达，请尽快上车" />
                );
            };
            let gettripping=()=>{
                return  (
                    <PageDriverHead topicinfo="行程开始，祝您一路好心情。" />
                );
            };

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
    }

};

const mapStateToProps = ({carmap:{mapstage,curmappagerequest,curmappageorder,curlocation}}) => {
    return {mapstage,curmappagerequest,curmappageorder,curlocation};
}


export default connect(
    mapStateToProps,
)(Page);
