import React from 'react';
import MapGaode from './mapcar.js';
import { connect } from 'react-redux';

import {
    View,
    Container,
    NavBar,
} from 'amazeui-touch';
import L from 'leaflet';
import CarOverlayInit from './caroverlayinit.js';
import CarOverlayOrder from './caroverlayorder.js';
import {carmap_resetmap,getprice_request} from '../../actions';

export class Page extends React.Component {

    componentDidMount () {
    }
    componentWillUnmount(){
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
            <View>
                <NavBar {...dataLeft}/>
                <Container scrollable={true}>
                    <div style={{height:"200px",overflow:"hidden"}}><MapGaode ref='mapgaode'/></div>
                    {floatcomponents}
                </Container>
            </View>);
    }

}

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
