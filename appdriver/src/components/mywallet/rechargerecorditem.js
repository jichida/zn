/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import WeUI from 'react-weui';
const {
    Cell,
    CellBody,
    CellFooter
} = WeUI;
import _ from 'lodash';
import moment from 'moment';

let Item =(props)=> {
  const {record} = props;
  return (
    <Cell key={record._id}>
      <CellBody>
          <span className="time">{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
          <span className="status">{_.get(record,'fromorder.triptype')}</span>
      </CellBody>
      <CellFooter>
          <span className="color_warning">{record.feebonus>0?"+":""}{record.feebonus}</span>
          <span className="">余额:{record.feenew}</span>
      </CellFooter>
  </Cell>);
}

export default Item;
