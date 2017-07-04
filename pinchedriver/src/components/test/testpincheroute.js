import {
  getmypincheroute_request,
  getonepincheroutepassengers_request
} from '../../actions';

let test_getmypincheroute_request=(dispatch)=>{
  dispatch(getmypincheroute_request({

  }));
}


let test_getonepincheroutepassengers_request=(dispatch)=>{
  dispatch(getonepincheroutepassengers_request({
    query:{_id:'xxxx'}
  }));
}

export {
  test_getmypincheroute_request,
  test_getonepincheroutepassengers_request
};
