/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import moment from 'moment';
import WeUI from 'react-weui';
const {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription
    } = WeUI;


let CarItem =(props)=> {
    let {carinfo,onClickSelCurCar} = props;
    if(!carinfo){
        return (<div>无订单项</div>);
    }
    console.log("carinfo:" + JSON.stringify((carinfo)));

    return (
      <MediaBox type="appmsg" href="javascript:void(0);">
          <MediaBoxHeader>
              <img src="newimg/18.png" />
          </MediaBoxHeader>
          <MediaBoxBody>
              <MediaBoxTitle>现代·1109</MediaBoxTitle>
              <MediaBoxDescription>
                  <span className="tag">苏A12345</span>
                  <span className="current">当前车辆</span>
              </MediaBoxDescription>
          </MediaBoxBody>
      </MediaBox>
    );
}

export default CarItem;
