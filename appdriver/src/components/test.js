/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  test_cargetallbrands_request,
  test_cargetallmodelfrombrandid_request,
  test_cargetallcolors_request,
  test_carcreate_request,
  test_cardelete_request,
  test_cargetall_request,
  test_carupdate_request,
} from '../test/index.js';



let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
            <Button onClick={()=>{test_cargetallbrands_request(props.dispatch)}}>获取所有汽车品牌</Button><br />
            <Button onClick={()=>{test_cargetallmodelfrombrandid_request(props.dispatch)}}>根据汽车品牌获取汽车型号</Button><br />
            <Button onClick={()=>{test_cargetallcolors_request(props.dispatch)}}>根据所有颜色</Button><br />
            <Button onClick={()=>{test_carcreate_request(props.dispatch)}}>新建汽车</Button><br />
            <Button onClick={()=>{test_carupdate_request(props.dispatch)}}>修改汽车</Button><br />
            <Button onClick={()=>{test_cardelete_request(props.dispatch)}}>删除汽车</Button><br />
            <Button onClick={()=>{test_cargetall_request(props.dispatch)}}>获取所有汽车</Button><br />
             <br />
         </p>
    </div>);
}


Page = connect()(Page);
export default Page;