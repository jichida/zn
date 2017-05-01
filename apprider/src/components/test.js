/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    test_mycartgetall_request,
    test_mycartaddone_request,
    test_mycartupdateone_request,
    test_mycartdelone_request
} from '../test/index.js';



let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
            <Button onClick={()=>{test_expressquery_request(props.dispatch)}}>查询快递物流信息</Button><br />
             <br />
            <Button onClick={()=>{test_getabouthtml_request(props.dispatch)}}>测试关于信息</Button><br />
             <br />
            <Button onClick={()=>{test_feedbackaddone(props.dispatch)}}>测试用户反馈</Button><br />
             <br />

         </p>
    </div>);
}


Page = connect()(Page);
export default Page;