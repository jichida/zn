import React from 'react';
import { connect } from 'react-redux';
import Callcardateinput from './callcardateinput';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {getstringoftime,getstringofdistance} from '../../util/geo.js';
import {ui_setcarmap,carmap_resetmap} from '../../actions';
import {starttriprequestorder} from '../../actions/sagacallback';
import {pushrequesttodrivers_request,changestartposition} from '../../actions';
import './caroverlayinit.css';
import { withRouter } from 'react-router-dom';

//初始化代驾余额

class Page extends React.Component {

    render(){
      const {
        dispatch,
        history,
        location,
        loginsuccess,
        srcaddress,
        dstaddress,
        totaldistance,
        totalduration,
        resultpricerequest,
        driverlist,
        triptype,
        ispagenow,
        ridedatesel,
        resulthtmlstring
      } = this.props;
      let onClickNow=(isnow)=>{
          dispatch(ui_setcarmap({ispagenow:isnow}));
      }
      let onClickSelDstAddress=()=>{
          history.push('/search/dstaddress');
      }
      let onClickSelSrcAddress=()=>{
          history.push('/search/srcaddress');
      };
      let onOK=()=>{
          if(!loginsuccess){
              //未登录，到登录页面
              let redirectAfterLogin = location.pathname;
              let loginroute = '/login?next=' + redirectAfterLogin;
              window.setTimeout(()=>{
                  history.push(loginroute);
              },0);
              return;
          }
          let param = {
              triprequest:{
                  srcaddress:srcaddress,
                  dstaddress:dstaddress,
                  triptype:triptype,
                  isrealtime:ispagenow,
              },
              order:{
                  totaldistance:totaldistance,
                  totalduration:totalduration,
                  resultpricedetail:resultpricerequest
              }
          };

          if(!ispagenow){//预约时间
              param.triprequest.dated_at = ridedatesel;
          }

          dispatch(starttriprequestorder(param)).then((result)=>{
              //推送给所有司机该订单
              let driveridlist =[];
              driverlist.forEach((driver)=>{
                  driveridlist.push(driver.driverid);
              });
              dispatch(pushrequesttodrivers_request({
                  orderid:result.triporder._id,
                  requestid:result.triprequest._id,
                  driveridlist:driveridlist
              }));
              history.push('/requestorderstarting');

          }).catch((error)=>{
          });
      }

      let handleSelect=(time)=> {
          dispatch(ui_setcarmap({
              ridedatesel:time
          }));
      }

      let onCancel=()=>{
          dispatch(carmap_resetmap());
      }

      //尚未叫车!
      let isgetsrc = false;
      let isgetdst = false;

      let srcname ='正在获取当前上车点...';
      let dstname = '请选择你要去的地方';

      if(srcaddress.addressname!=''){
          srcname = srcaddress.addressname;
          isgetsrc = true;
      }

      if(dstaddress.addressname!=''){
          dstname = dstaddress.addressname;
          isgetdst = true;
      }

      let floatcomponents;
      let isgetaddress = isgetdst&&isgetsrc;

      return (
          <div className="caroverlayinitPage">
              {
                  //这里是注释
                  !isgetaddress?(
                      <ul className="listnav">
                          <li
                              key='now'
                              className={ispagenow?"hover":""}
                              onClick={()=>{onClickNow(!ispagenow)}}
                              >
                              现在
                          </li>
                          <li
                              key='date'
                              className={ispagenow?"":"hover"}
                              onClick={()=>{onClickNow(!ispagenow)}}
                              >
                              预约
                          </li>
                      </ul>
                  ):""
              }
              <div className="listcontent">
                  {
                      //这里是注释
                      !ispagenow&&!isgetaddress?(
                          <div className="setordertime">
                              <span>
                                  <img src="newimg/33.png" />
                                  预约时间:
                              </span>
                              <Callcardateinput
                                  value={moment(ridedatesel)}
                                  onChange={handleSelect}
                              />
                          </div>

                      ):""
                  }
                  {
                      //这里是注释
                      !isgetaddress?(
                          <div className="addresslist">
                              <li onClick={onClickSelSrcAddress} className="cfd_icon">{srcname}</li>
                              <li onClick={onClickSelDstAddress} className="color_warning"><span>{dstname}</span></li>
                          </div>
                      ):""
                  }
                  {
                      //这里是注释
                      isgetaddress?(
                          <div className="isGetaddress">
                              <span className="showprice">{renderHTML(resulthtmlstring)}</span>
                              <div className="li"><a className="btn_a" onClick={onOK}>叫车</a></div>
                              <div className="li"><a className="btn_b" onClick={onCancel}>取消</a></div>
                          </div>
                      ):""
                  }
              </div>
          </div>
      );
    }
};

const mapStateToProps = (state) => {
  const {
    carmap:{
      srcaddress,
      dstaddress,
      totaldistance,
      totalduration,
      resultpricerequest,
      driverlist,
      triptype,
      resulthtmlstring,
    },
    appui:{
      carmap:
      {
        ispagenow,
        ridedatesel
      }
    },
    app:{
      daijialeastbalance
    },
    userlogin:{
      balance,
      loginsuccess
    }
  } = state;

  let statenew = {
    loginsuccess,

    srcaddress,
    dstaddress,
    totaldistance,
    totalduration,
    resultpricerequest,
    driverlist,
    triptype,
    resulthtmlstring,

    ispagenow,
    ridedatesel,

    daijialeastbalance,
    balance
  };
  return statenew;
}

Page = withRouter(Page);
export default connect(
    mapStateToProps,
)(Page);
