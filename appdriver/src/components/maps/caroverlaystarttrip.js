import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  NavBar,
} from 'amazeui-touch';
import {carmap_resetmap,carmap_setmapstage,initdriverroute,driveroute_request} from '../../actions';
import {updaterequeststatus,canceltriprequestorder} from '../../actions/sagacallback';

import CaroverlayLxck from './embmapstep1lxck';
import CaroverlayQjck from './embmapstep2qjck';
import CaroverlayJdck from './embmapstep3jdck';
import CaroverlayKsxc from './embmapstep4ksxc';

export class Page extends React.Component {

  componentWillMount () {
    this.props.dispatch(initdriverroute());
  }

  componentWillReceiveProps (nextProps) {
      const {curmappagerequest} = nextProps;
      if(curmappagerequest.requeststatus === "已取消"){
          //let triporderid = nextProps.curmappageorder._id;
         window.setTimeout(()=>{
              nextProps.history.goBack();//replace(`/orderdetail/${triporderid}`);
              nextProps.dispatch(carmap_resetmap());
          },0);
      }
  }

  onClickNext(btnname){
    console.log(`点击按钮:${btnname}`);
    let currentrequest = this.props.curmappagerequest;
    if(this.props.mapstage === '联系乘客'){
      //规划路线
      this.props.dispatch(carmap_setmapstage('去接乘客'));
    }
    else if(this.props.mapstage === '去接乘客'){
        //更新请求状态（接到乘客）
        this.props.dispatch(updaterequeststatus({
            triprequestid:currentrequest._id,
            triporderid:this.props.curmappageorder._id,
            requeststatus: "待上车"
        })).then((result)=>{
          this.props.dispatch(carmap_setmapstage('接到乘客'));
        });
     }
      else if(this.props.mapstage === '接到乘客'){
        this.props.dispatch(updaterequeststatus({
            triprequestid:currentrequest._id,
            triporderid:this.props.curmappageorder._id,
            requeststatus: "行程中",
        })).then((result)=>{
          this.props.dispatch(carmap_setmapstage('开始行程'));
        });
      }
     else if(this.props.mapstage === '开始行程'){
      //更新请求状态（送到乘客目的地）
      //重定向到订单页面！
        this.props.dispatch(updaterequeststatus({
            triprequestid:currentrequest._id,
            triporderid:this.props.curmappageorder._id,
            requeststatus: "行程完成",
        })).then((result)=>{
            window.setTimeout(()=>{
                this.props.history.replace(`/orderdetail/${result.triporder._id}`);
                this.props.dispatch(carmap_resetmap());
            },0);

        });
    }
  }

   cancelrequest =()=>{
    this.props.dispatch(canceltriprequestorder({
      triporderid:this.props.curmappageorder._id,
      triprequestid:this.props.curmappagerequest._id
    })).then((result)=>{
      this.props.history.goBack();//replace(`/orderdetail/${triporderid}`);
      window.setTimeout(()=>{
          this.props.dispatch(carmap_resetmap());
      },0);
    });
  }
  render() {
      const dataLeft = {
        title:this.props.mapstage
      };
      let currentrequest = this.props.curmappagerequest;
      let currentorder = this.props.curmappageorder;
      let CaroverlayCo;
      if(currentrequest.requeststatus !== "已取消" && currentrequest.requeststatus){
        //被reset了！！
        if(this.props.mapstage === '联系乘客'){
          CaroverlayCo = <CaroverlayLxck
          currentrequest={currentrequest}
          currentorder={currentorder}
          onClickCancel={this.cancelrequest}
          onClickNext={this.onClickNext.bind(this,'去接乘客')}
          curlocation={this.props.curlocation}/>
        }
        else if(this.props.mapstage === '去接乘客'){
          CaroverlayCo = <CaroverlayQjck
           currentrequest={currentrequest}
           currentorder={currentorder}
           driveroute={this.props.driveroute}
           onClickCancel={this.cancelrequest}
           onClickNext={this.onClickNext.bind(this,'接到乘客')}
           curlocation={this.props.curlocation}/>
        }
        else if(this.props.mapstage === '接到乘客'){
          CaroverlayCo = <CaroverlayJdck
           currentrequest={currentrequest}
           currentorder={currentorder}
           driveroute={this.props.driveroute}
           onClickCancel={this.cancelrequest}
           onClickNext={this.onClickNext.bind(this,'开始行程')}
           curlocation={this.props.curlocation}/>
        }
        else if(this.props.mapstage === '开始行程'){
          CaroverlayCo = <CaroverlayKsxc
          currentrequest={currentrequest}
          currentorder={currentorder}
          driveroute={this.props.driveroute}
          onClickNext={this.onClickNext.bind(this,'到达目的地')}
          curlocation={this.props.curlocation}/>
        }
        else if(this.props.mapstage === '行程完成'){
            CaroverlayCo=<div>行程完成,正在拉取订单,请稍后...</div>
        }
      }
      return (<View>
           <NavBar {...dataLeft}/>
           {CaroverlayCo}
          </View>);
    }

}


const mapStateToProps = ({driveroute,operate,carmap},props) => {
  let curlocation = operate.curlocation;
  return {driveroute,...carmap,curlocation};
}


export default connect(
mapStateToProps,
)(Page);
