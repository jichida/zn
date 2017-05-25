import { createSelector } from 'reselect';
import _ from 'lodash';

const getcoupons = (state,props)=>{
  const {mycoupon:{couponlist}} = state;
  return couponlist;
}

const getorderinfo = (state,props)=>{
  const {myorders} = state;
  let triporderid = props.match.params.sel;
  if(triporderid === 'nosel'){
    return {_id:'nosel'};
  }
  let orderinfo = myorders.triporders[triporderid];
  return orderinfo;
}


const getmycoupons = createSelector(
  [getcoupons,getorderinfo],
  (couponlist,orderinfo)=>{
    let mycoupons = [];
    _.map(couponlist,(coupon)=>{
      coupon.enabled = (orderinfo._id === 'nosel');
      if(!coupon.enabled){
         coupon.enabled = (coupon.triptype === orderinfo.triptype);
      }
      mycoupons.push(coupon);
    });
    return {couponlist:mycoupons,sel:true};
  }
);

export default getmycoupons;
