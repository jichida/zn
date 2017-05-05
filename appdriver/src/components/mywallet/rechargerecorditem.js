/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import moment from 'moment';
import WeUI from 'react-weui';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter
} = WeUI;


let Item =(props)=> {
    let {rechargerecord} = props;
    return (
      <Cell>
          <CellBody>
              <span className="time">2016-11-12</span>
              <span className="status">正在处理中...</span>
          </CellBody>
          <CellFooter>
              <span className="color_warning">-10</span>
          </CellFooter>
      </Cell>
    );
}

export default Item;
