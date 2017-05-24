import React,{ Component } from 'react';
import { Icon } from 'semantic-ui-react';

import '../../../public/css/popinfocar.css';
let Popinfocar = (props)=> {
  return (
    <div className="mapCoverInfo" style={{left:props.positiondiv[0]+'px',top:props.positiondiv[1]+'px'}}>
    <div className="infoCont">
      <div className="info">
        <p><span>2</span></p>
        <p><span>分钟</span></p>
      </div>
      <div className="price">
        <span>在这里上车<Icon name="angle right"/></span>
      </div>
    </div>
    <div className="point"></div>
  </div>);
}

export default Popinfocar;
