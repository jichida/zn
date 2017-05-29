/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import {put,takeEvery,call,take,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  payorder
} from '../env/pay.js';

import {
  payorder_result,
  getpaysign_request,
  getpaysign_result,
  serverpush_userbalance,
  queryuserbalance_result,
} from '../actions';
import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

function takepay(paysign,orderinfo) {
    return new Promise(resolve => {
      payorder(paysign,orderinfo,(result)=>{
        resolve(result);
      });
    });
}

export function* payflow() {
    console.log(`payflow======>`);

    yield takeEvery(`${payorder_result}`, function*(action) {
          let {payload:result} = action;
          console.log(`payorder_result:${JSON.stringify(result)}`);
          const {orderinfo} = result;
          let orderdoc = {
             out_trade_no: orderinfo._id,
             subject: orderinfo.ordertitle || '商品名称',
             body: orderinfo.orderdetail|| '商品详情',
             total_fee: orderinfo.realprice
           };
           if(orderinfo.paytype === 'weixin'){
             orderdoc.total_fee = orderinfo.realprice*100;
           }
          yield put(getpaysign_request({
              paytype:orderinfo.paytype,
              paypage:'orderdetailpage',
              orderdoc:orderdoc,
          }));
          let { payload:paysign } = yield take(`${getpaysign_result}`);
          let payresult = yield call(takepay,paysign,orderinfo);
          console.log(`payresult:${JSON.stringify(payresult)},orderinfo.triptype:${orderinfo.triptype}`);
          if(orderinfo.triptype === '充值'){
            const { response, timeout } = yield race({
               response: take(`${serverpush_userbalance}`),
               timeout: call(delay, 5000)
            });
            if(!!timeout){
              yield put(queryuserbalance_result(response.payload));
            }
          }
          yield put(goBack());//返回上一页面
    });


}
