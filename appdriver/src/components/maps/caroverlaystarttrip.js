import React from 'react';
import { connect } from 'react-redux';
import {carmap_resetmap,set_weui} from '../../actions';
import {updaterequeststatus,canceltriprequestorder} from '../../actions/sagacallback';
import '../../../public/newcss/outcar.css';
//import CaroverlayLxck from './embmapstep1lxck';
import CaroverlayQjck from './embmapstep2qjck';
import CaroverlayJdck from './embmapstep3jdck';
import CaroverlayKsxc from './embmapstep4ksxc';

export class Page extends React.Component {

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
      const {curmappagerequest,history,dispatch} = nextProps;
      if(curmappagerequest.requeststatus === "已取消"){
          //let triporderid = nextProps.curmappageorder._id;
         window.setTimeout(()=>{
              history.goBack();//replace(`/orderdetail/${triporderid}`);
              dispatch(carmap_resetmap());
          },0);
      }
  }

  onClickNext(btnname){
    console.log(`点击按钮:${btnname}`);
    const {curmappagerequest,curmappageorder,dispatch,history}= this.props;

    if(curmappagerequest.requeststatus === '已接单'){
        //更新请求状态（接到乘客）
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "待上车"
        })).then((result)=>{
        });
     }
    else if(curmappagerequest.requeststatus === '待上车'){
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "行程中",
        })).then((result)=>{
        });
      }
     else if(curmappagerequest.requeststatus === '行程中'){
      //更新请求状态（送到乘客目的地）
      //重定向到订单页面！
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "行程完成",
        })).then((result)=>{
            window.setTimeout(()=>{
                dispatch(carmap_resetmap());
                history.replace(`/orderdetail/${result.triporder._id}`);
            },0);

        });
    }
  }

   cancelrequest =()=>{
     const {curmappagerequest,curmappageorder,dispatch,history}= this.props;
     let cancelr = ()=>{
         dispatch(canceltriprequestorder({
          triporderid:curmappageorder._id,
          triprequestid:curmappagerequest._id
        })).then((result)=>{
          history.goBack();//replace(`/orderdetail/${triporderid}`);
          window.setTimeout(()=>{
              dispatch(carmap_resetmap());
          },0);
        });
     }
     let confirm = {
       show : true,
       title : "取消订单",
       text : "你确定需要取消吗?",
       buttonsCloseText : "取消",
       buttonsClickText : "确定",
       buttonsClose : ()=>{console.log('click close');},
       buttonsClick : ()=>{cancelr();}
     };
     this.props.dispatch(set_weui({confirm}));

  }
  render() {
      const {curmappagerequest:currentrequest,curmappageorder:currentorder,
        curlocation,driveroute,} = this.props;

      let CaroverlayCo;
      if(currentrequest.requeststatus !== "已取消" && currentrequest.requeststatus){
        //被reset了！！
        if(currentrequest.requeststatus === '已接单'){
            CaroverlayCo =
                <CaroverlayQjck
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickCancel={this.cancelrequest}
                    onClickNext={this.onClickNext.bind(this,'接到乘客')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '待上车'){
            CaroverlayCo =
                <CaroverlayJdck
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickCancel={this.cancelrequest}
                    onClickNext={this.onClickNext.bind(this,'开始行程')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '行程中'){
            CaroverlayCo =
                <CaroverlayKsxc
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickNext={this.onClickNext.bind(this,'到达目的地')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '行程完成'){
            CaroverlayCo=<div>行程完成,正在拉取订单,请稍后...</div>
        }
      }
        return (
            <div className="outcarPage AppPage">
                {CaroverlayCo}
            </div>
        );
    }

}


const mapStateToProps = (state) => {
  const {driveroute,operate:{curlocation},carmap:{curmappagerequest,curmappageorder}} = state;
  let newstate = {
    driveroute,
    curmappagerequest,
    curmappageorder,
    curlocation
  }
  return newstate;
}


export default connect(
mapStateToProps,
)(Page);
