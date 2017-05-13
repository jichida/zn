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

    const {Platform_baseInfoVehicle,approvalstatus} = carinfo;
    console.log("carinfo:" + JSON.stringify((carinfo)));
    let co = (<MediaBoxBody>
                  <MediaBoxTitle>{Platform_baseInfoVehicle.Brand}·{Platform_baseInfoVehicle.Model}</MediaBoxTitle>
                  <MediaBoxDescription>
                      <span className="tag">{Platform_baseInfoVehicle.VehicleNo}</span>
                      {isdefault && (<span className="current">当前车辆</span>)}
                  </MediaBoxDescription>
              </MediaBoxBody>);
    if(approvalstatus !== '已审核'){
          co = (<MediaBoxBody>
                   <MediaBoxTitle>点前车辆不可用</MediaBoxTitle>
                   <MediaBoxDescription>
                       <span className="tag">{approvalstatus}</span>
                    </MediaBoxDescription>
               </MediaBoxBody>);
    }
    return (
      <MediaBox type="appmsg" onClick={
        ()=>{
        if(approvalstatus === '已审核'){
          onClickSelCurCar(carinfo);
        }
      }}>
          <MediaBoxHeader>
              <img src={carinfo.PhotoandCarmanURL} />
          </MediaBoxHeader>
          {co}
      </MediaBox>
    );
}

export default CarItem;