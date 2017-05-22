/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeEvery,call,take} from 'redux-saga/effects';
import {
  payorder
} from '../env/pay.js';

import {
  payorder_result,
  getpaysign_request,
  getpaysign_result,
} from '../actions';
import { push,replace } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

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
             body: orderinfo.body|| '商品详情',
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
          console.log(`payresult:${JSON.stringify(payresult)}`);
          // confirmorder_result
          //yield put(replace('/'));
    });


}
