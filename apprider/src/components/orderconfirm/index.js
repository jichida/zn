/**
 * Created by wangxiaoqing on 2017/3/22.
 */
import React from 'react';
import {
    Container,
    View,
    Group,
    NavBar,
    Grid,
    Col,
    List,
    Button
} from 'amazeui-touch';

import { connect } from 'react-redux';

import OrderToPayDetailPinche from './pinche';
import OrderToPayDetailTourbus from './tourbus';
import {insertorder} from '../../actions/sagacallback';

import {orderconfirm_setpayway} from '../../actions';

export class Page extends React.Component {

    componentWillMount () {
    }
    componentWillUnmount(){
     }
    onClickBack(){
        this.props.history.goBack();
    }

    onClickOK(){
        let order = {};

        //生成一个订单，跳转到订单详情页

        if(this.props.match.params.clickfrom === 'pinche'){
            order = {
                triptype:'拼车',
                ordertitle:'拼车订单',
                orderdetail:this.props.startcity+'('+this.props.beginstation+')至'+this.props.endcity+'('+this.props.endstation+')',
                starttime:this.props.starttime,//出发时间
                startdate:this.props.startdate,//出发日期
                startstation:this.props.beginstation,//关联拼车信息
                endstation:this.props.endstation,//关联拼车信息
                startcity:this.props.startcity,//关联拼车信息
                endcity:this.props.endcity,//关联拼车信息
                orderprice:this.props.orderprice,
                relatedid:this.props._id,
                frontmoney:0
            };
        }
        else if(this.props.match.params.clickfrom === 'tourbus'){
            order = {
                triptype:'旅游大巴',
                rentusername:this.props.rentusername,
                startdate:this.props.startdate,//出发日期
                enddate:this.props.enddate,//出发日期
                orderdetail:this.props.orderdetail,
                orderprice:this.props.orderprice,
                frontmoney:this.props.frontmoney
            };
        }
        else{
            console.log(`${this.props.match.params.clickfrom}`);
            return;
        }
        console.log(`insertorder order:` + JSON.stringify(order));
        this.props.dispatch(insertorder(order)).then(({triporder})=>{
            this.props.history.replace(`/orderdetail/${triporder._id}`);
        });
      }

    onClickPayway(name){
      this.props.dispatch(orderconfirm_setpayway(name));
    }
    render() {
        const dataLeft = {
            title: '确认出行',
        };

        let OrderToPayDetail = null;
        if(this.props.match.params.clickfrom === 'pinche'){
            OrderToPayDetail = <OrderToPayDetailPinche {...this.props} />;
        }
        else if(this.props.match.params.clickfrom === 'tourbus'){
            OrderToPayDetail = <OrderToPayDetailTourbus {...this.props} />;
        }
        return (
            <View>
                <NavBar {...dataLeft}/>
                <Container scrollable={true}>

                    {OrderToPayDetail}

                    <div className="padding" >
                        <Button onClick={this.onClickOK.bind(this)} amStyle="primary" block>继续,订单{this.props.orderprice}元</Button>
                        <Button onClick={this.onClickBack.bind(this)} block>取消</Button>
                    </div>
                </Container>

            </View>

        );
    }
}




const mapStateToProps = ({orderconfirm},props) => {
    const {pinche,tourbus,payway} = orderconfirm;
    let cheprops = null;
    if(props.match.params.clickfrom === 'pinche'){
        cheprops = pinche;
    }
    else if(props.match.params.clickfrom === 'tourbus'){
        cheprops = tourbus;
    }
    return {...cheprops,payway};
}


export default connect(
    mapStateToProps,
)(Page);
