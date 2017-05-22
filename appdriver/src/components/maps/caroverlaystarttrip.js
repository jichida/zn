import React from 'react';
import { connect } from 'react-redux';
import {carmap_resetmap,carmap_setmapstage,initdriverroute,driveroute_request} from '../../actions';
import {updaterequeststatus,canceltriprequestorder} from '../../actions/sagacallback';
import '../../../public/newcss/outcar.css';
//import CaroverlayLxck from './embmapstep1lxck';
import CaroverlayQjck from './embmapstep2qjck';
import CaroverlayJdck from './embmapstep3jdck';
import CaroverlayKsxc from './embmapstep4ksxc';

export class Page extends React.Component {

  componentWillMount () {
    this.props.dispatch(initdriverroute());
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
    const {mapstage,curmappagerequest,curmappageorder,dispatch,history}= this.props;

    if(mapstage === '去接乘客'){
        //更新请求状态（接到乘客）
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "待上车"
        })).then((result)=>{
          dispatch(carmap_setmapstage('接到乘客'));
        });
     }
      else if(mapstage === '接到乘客'){
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "行程中",
        })).then((result)=>{
          dispatch(carmap_setmapstage('开始行程'));
        });
      }
     else if(mapstage === '开始行程'){
      //更新请求状态（送到乘客目的地）
      //重定向到订单页面！
        dispatch(updaterequeststatus({
            triprequestid:curmappagerequest._id,
            triporderid:curmappageorder._id,
            requeststatus: "行程完成",
        })).then((result)=>{
            window.setTimeout(()=>{
                history.replace(`/orderdetail/${result.triporder._id}`);
                dispatch(carmap_resetmap());
            },0);

        });
    }
  }

   cancelrequest =()=>{
     const {curmappagerequest,curmappageorder,dispatch,history}= this.props;

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
  render() {
      const {mapstage,curmappagerequest:currentrequest,curmappageorder:currentorder,
        curlocation,driveroute,} = this.props;
      const dataLeft = {
        title:mapstage
      };

      let CaroverlayCo;
      if(currentrequest.requeststatus !== "已取消" && currentrequest.requeststatus){
        //被reset了！！
        if(mapstage === '去接乘客'){
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
        else if(mapstage === '接到乘客'){
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
        else if(mapstage === '开始行程'){
            CaroverlayCo =
                <CaroverlayKsxc
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickNext={this.onClickNext.bind(this,'到达目的地')}
                    curlocation={curlocation}
                />
        }
        else if(mapstage === '行程完成'){
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
  const {driveroute,operate:{curlocation},carmap:{curmappagerequest,curmappageorder,mapstage}} = state;
  let newstate = {
    driveroute,
    mapstage,
    curmappagerequest,
    curmappageorder,
    curlocation
  }
  return newstate;
}


export default connect(
mapStateToProps,
)(Page);
