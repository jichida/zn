import { createReducer } from 'redux-act';
import { mycoupongetall_result } from '../actions';

const initial = {
  mycoupon: {
    couponlist:[]
  },
};

const mycoupon = createReducer({
  [mycoupongetall_result]: (state,payload) => {
    let couponlist = payload.list.docs;
    return { ...state,couponlist};
  },
}, initial.mycoupon);

export default mycoupon;
