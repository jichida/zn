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
    let {carinfo,isdefault,onClickSelCurCar} = props;
    if(!carinfo){
        return (<div>无车</div>);
    }

    const {Platform_baseInfoVehicle} = carinfo;
    console.log("carinfo:" + JSON.stringify((carinfo)));

    return (
      <MediaBox type="appmsg" onClick={()=>onClickSelCurCar(carinfo)}>
          <MediaBoxHeader>
              <img src={carinfo.PhotoandCarmanURL} />
          </MediaBoxHeader>
          <MediaBoxBody>
              <MediaBoxTitle>{Platform_baseInfoVehicle.Brand}·{Platform_baseInfoVehicle.Model}</MediaBoxTitle>
              <MediaBoxDescription>
                  <span className="tag">{Platform_baseInfoVehicle.VehicleNo}</span>
                  {isdefault && (<span className="current">当前车辆</span>)}
              </MediaBoxDescription>
          </MediaBoxBody>
      </MediaBox>
    );
}

export default CarItem;
