import {
  login_request,
  logout_request
} from '../../actions';

let test_login_request=(dispatch)=>{
  dispatch(login_request({username:'15961125167',password:'123456'}));
}


let test_logout_request=(dispatch)=>{
  dispatch(logout_request({}));
}

export {
  test_login_request,
  test_logout_request
};
