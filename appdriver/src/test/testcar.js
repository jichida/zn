import {
  carcreate_request,
  cardelete_request,
  cargetall_request,
  carupdate_request,
  cargetallbrands_request,
  cargetallmodelfrombrandid_request,
  cargetallcolors_request
} from '../actions';

let test_cargetallbrands_request=(dispatch)=>{
  dispatch(cargetallbrands_request({}));
}

let test_cargetallmodelfrombrandid_request=(dispatch)=>{
  dispatch(cargetallmodelfrombrandid_request({carbrandid:'5900476319092b0764706da2'}));
}

let test_cargetallcolors_request=(dispatch)=>{
dispatch(cargetallcolors_request({}));
}

let test_carcreate_request=(dispatch)=>{
  dispatch(carcreate_request({
    carmodelid:'59004b2219092b0764706da5',
    carcolorid:'59004bba19092b0764706da9',
    isdefault:true
  }));
}


let test_cardelete_request=(dispatch)=>{
  dispatch(cardelete_request({
    _id:'590071a15e01e22988f722a2'
  }));
}

let test_cargetall_request=(dispatch)=>{
  dispatch(cargetall_request({
    
  }));
}

let test_carupdate_request=(dispatch)=>{
 dispatch(carupdate_request({
    _id:'590071d45e01e22988f722b7',
    data:{
      carcolorid:'59004baa19092b0764706da8',
    }
  }));
}




export {
  test_cargetallbrands_request,
  test_cargetallmodelfrombrandid_request,
  test_cargetallcolors_request,
  test_carcreate_request,
  test_cardelete_request,
  test_cargetall_request,
  test_carupdate_request,
};