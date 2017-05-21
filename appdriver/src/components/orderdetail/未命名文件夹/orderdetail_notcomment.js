import React from 'react';
import {
  Button,Container
} from 'amazeui-touch';
import {Rating} from 'belle';

const OrderDetailCarComment = (props) => {
  let commenttags = props.commenttags || [];
  let commenttagsco = [];
  commenttags.forEach((ctags)=>{
    commenttagsco.push(<span key={ctags} onClick={
      ()=>{
        let commentstring = props.comment + ' ' +　ctags;
        props.onChangeFieldname('comment',commentstring)
      }
    }>{ctags}</span>);
  });
  let onClickFeedetail = ()=>{
    props.history.push(`/feedetail/${props.orderinfo._id}`);
  }
  return (
    <Container scrollable={true}>
    <div className="group group-no-padded margin-top-0">
      <div className="group-body">
        <ul className="list">
          <li target="_blank" className="item item-content">
            <div className="item-media"><img width="50" src="images/user.jpg" className="radius50" /></div>
            <div className="item-main">
              <div className="cfd_icon">{props.orderinfo.srcaddress.addressname}</div>
              <div className="zd_icon">{props.orderinfo.dstaddress.addressname}</div>
            </div>
            <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </li>
        </ul>
      </div>
    </div>
    <div className="group group-no-padded margin-bottom-0">
      <div className="group-body">
        <div className="g text-center padding">
          <div className="col col-2 border_right"><span className="icon icon-zf text-primary fize32"></span>
            <div className="sk-icon-name text-truncate">{props.orderinfo.paystatus}</div>
          </div>
          <div className="col col-4">支付金额：<b className="fize28 text-primary">{props.orderinfo.orderprice}</b> 元</div>
        </div>
        <p onClick={onClickFeedetail} className="margin-0 text-center padding-bottom"><a ><small>查看收费明细</small></a></p>
        <hr className="margin-top-0 margin-bottom-0" />
        <div className="padding">
          <p className="text-center">匿名评价乘客</p>
           <div className="text-center">
          <Rating defaultValue={props.ratenum}
           onUpdate={(rating)=>{
             props.onChangeFieldname('ratenum',rating.value);
          }} />
        </div>
        </div>
        <div className="padding pjby">
        {commenttagsco}
        </div>
        <div className="padding padding-top-0">
          <label className="field-container ">
          <textarea placeholder="评价内容内容内容内容" type="textarea" className="field gray_bg borderless radius5"
          value={props.comment} onChange={(e)=>{
            props.onChangeFieldname('comment',e.target.value)
          }}>
          </textarea>

          </label>
        </div>
        <div className="padding" ><Button onClick={()=>{
          props.onClickCarComment();
        }}
        amStyle="primary" block>提交</Button></div>
      </div>
    </div>
    </Container>);
}



export default OrderDetailCarComment;
