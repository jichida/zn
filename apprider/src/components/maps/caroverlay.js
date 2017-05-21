import React from 'react';
import MapGaode from './mapcar.js';
import { connect } from 'react-redux';
import {
    View,
    Container,
} from 'amazeui-touch';
import NavBar from "../tools/nav";
import L from 'leaflet';
import CarOverlayInit from './caroverlayinit.js';
import CarOverlayOrder from './caroverlayorder.js';
import "../../../public/newcss/caroverlay.css";
import {
    carmap_resetmap,
    getprice_request,
    set_weui,
    changestartposition
    } from '../../actions';
import {
    canceltriprequestorder
    } from '../../actions/sagacallback';

export class Page extends React.Component {

    //取消叫车
    cancelcar =()=>{
        this.props.dispatch(set_weui({
            confirm : {
                show : true,
                title : "取消叫车",
                text : "您确定要取消叫车吗",
                buttonsCloseText : "取消",
                buttonsClickText : "确定",
                buttonsClose : ()=>{},
                buttonsClick : ()=>{this.cancelrequest()}
            },
        }))
    }

    cancelrequest =()=>{
        this.props.dispatch(canceltriprequestorder({
            triporderid:this.props.curmappageorder._id,
            triprequestid:this.props.curmappagerequest._id
        })).then((result)=>{
            let srclocationstring = this.props.curlocation.lng + ',' + this.props.curlocation.lat;
            this.props.dispatch(changestartposition({
                location:srclocationstring
            }));//重新发送一次附近请求
        });
    }

    componentWillReceiveProps (nextProps) {
        const {mapstage,history,curmappagerequest,curmappageorder,dispatch} = nextProps;
        if(mapstage === 'pageinit'){
            history.replace('/');
        }
        else{
            if(curmappagerequest.requeststatus === '行程完成'){
                //重置状态
                dispatch(carmap_resetmap());
                history.replace(`/orderdetail/${curmappageorder._id}`);
            }
            else if(curmappagerequest.requeststatus === '已取消'){
                //重置状态
                dispatch(carmap_resetmap());
                history.replace(`/`);
            }
        }
    }

    render() {
        const {mapstage,history,curmappagerequest,curmappageorder,dispatch} = this.props;
        if(!curmappagerequest.hasOwnProperty('_id')){
            return <div>无请求</div>
        }
        let dataLeft = {
            title:curmappagerequest.requeststatus
        };

        if(dataLeft.title === '行程完成'){
            const itemLeft = {
                title: '返回'
            };
            dataLeft = {
                title: dataLeft.title,
                leftNav: [{...itemLeft, icon: 'left-nav'}],
                onAction: ()=>{
                    history.replace('/');
                },
            };
        }

        let floatcomponents;
        if(mapstage === 'pageinit'){
            floatcomponents = <CarOverlayInit {...this.props}/>;
        }
        else if(mapstage === 'pageorder'){
            if(curmappagerequest.requeststatus === '行程完成'){
                floatcomponents =  <div>行程完成,正在生成订单</div>;
                return (<View>
                    <NavBar {...dataLeft}/>
                    <Container scrollable={true}>
                        {floatcomponents}
                    </Container>
                </View>);
            }
            else{
              floatcomponents =  <CarOverlayOrder  {...this.props}/>;
            }
        }
        return (
            <div className="caroverlayPage AppPage">
                <NavBar
                    back={false}
                    title={dataLeft.title}
                    rightnav={[
                        {
                            type : 'action',
                            action : this.cancelcar.bind(this),
                            text : "取消叫车"
                        },
                    ]}
                    />
                <div className="list">
                    <MapGaode ref='mapgaode' />
                    {floatcomponents}
                </div>
            </div>
        );
    }

}
//<NavBar {...dataLeft}/>
/*
 分4个页面：
 1.mapcarpage,公用
 {
 mapstage:'pageinit'/'pageorder'
 zoomlevel,
 startaddress,
 endaddress,
 curlocation,
 pastpathlatlngs,//走过的路线
 leftpathlatlngs//剩余的路线
 }
 2.mappageinit:{
 ispagenow,
 ridedateopen
 ridedatesel
 totaldistance
 }
 3.mappagerequest：
 {
 reqobj
 }
 4.curmappageorder
 {
 orderobj
 }
 */


const mapStateToProps = ({carmap:{mapstage,curmappagerequest,curmappageorder}}) => {
    return {mapstage,curmappagerequest,curmappageorder};
}


export default connect(
    mapStateToProps,
)(Page);
