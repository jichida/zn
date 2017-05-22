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
        const {curmappageorder,curmappagerequest,curlocation,dispatch} = this.props;
        dispatch(canceltriprequestorder({
            triporderid:curmappageorder._id,
            triprequestid:curmappagerequest._id
        })).then((result)=>{
            dispatch(changestartposition({
                location:`${curlocation.lng},${curlocation.lat}`
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
                window.setTimeout(()=>{
                  dispatch(carmap_resetmap({}));
                  history.replace(`/orderdetail/${curmappageorder._id}`);
                });
              }
            else if(curmappagerequest.requeststatus === '已取消'){
                //重置状态
                window.setTimeout(()=>{
                  dispatch(carmap_resetmap({}));
                  history.replace(`/`);
                });
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

        if(mapstage === 'pageorder' && curmappagerequest.requeststatus === '行程完成'){
              return (<View>
                    <NavBar {...dataLeft}/>
                    <Container scrollable={true}>
                        <div>行程完成,正在生成订单</div>
                    </Container>
                </View>);
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
                    {mapstage === 'pageinit' && <CarOverlayInit />}
                    {mapstage === 'pageorder' && <CarOverlayOrder />}
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


const mapStateToProps = ({carmap:{mapstage,curmappagerequest,curmappageorder,curlocation}}) => {
    return {mapstage,curmappagerequest,curmappageorder,curlocation};
}


export default connect(
    mapStateToProps,
)(Page);
