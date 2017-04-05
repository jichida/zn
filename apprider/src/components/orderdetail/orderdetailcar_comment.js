import React from 'react';
import {
  Button
} from 'amazeui-touch';
import {Rating} from 'belle';

const OrderDetailCarComment = (props) => {
  if(!props.hasOwnProperty('orderinfo')){
    return (<div>无效订单</div>);
  }
  let driverinfo = props.orderinfo.driveruserinfo|| {
        drivername:'无名司机',
        carid:'隐藏车牌',
        carname:'匿名车辆',
        starnum:5
      };
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
  return (
    <div>
    <div className="group group-no-padded margin-top-0">
      <div className="group-body">
        <ul className="list">
          <li target="_blank" className="item item-content">
            <div className="item-media"><img width="60" src="images/user.jpg"  className=" radius50" alt='user'/></div>
            <div className="item-main">
              <div className="item-title-row">
                <h3 className="item-title">{driverinfo.drivername}~{driverinfo.carid}</h3>
              </div>
              <div className="item-subtitle">{driverinfo.carname}</div>
              <Rating defaultValue={driverinfo.starnum} disabled={true}
              characterStyle={{'fontSize':'1.4rem'}}/>
            </div>
            <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </li>
        </ul>
      </div>
    </div>

    <div className="group group-no-padded">
    <div className="group-body">
    <div className="padding">
      <p className="text-center">匿名评价司机</p>
      <div className="text-center"><Rating defaultValue={props.ratenum}
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
    </div>
	<div className="padding" ><Button onClick={()=>{
    props.onClickCarComment();
  }}
  amStyle="primary" block>提交</Button></div>
	</div>
     </div>);
}



export default OrderDetailCarComment;
