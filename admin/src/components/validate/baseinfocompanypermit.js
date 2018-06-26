import _ from 'lodash';
// address应与4.1相对应
//       Certificate 请填写真实数据
// Organization 请填写真实数据
// StartDate，StopDate 不能相同

const validate_baseinfocompanypermit_edit = (values) => {
  console.log(values);
    const errors = {};
    //341100
    if (_.get(values,'Address') != '341100') {
        _.set(errors,'Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    //Certificate 请填写真实数据
    if (!_.get(values,'Certificate')) {
        _.set(errors,'Certificate', ['Certificate 请填写真实数据'])
    }
    else{
      if(_.get(values,'Certificate').length < 5){
        _.set(errors,'Certificate', ['Certificate 请填写真实数据'])
      }
    }

    //Organization 请填写真实数据
    if (!_.get(values,'Organization')) {
        _.set(errors,'Organization', ['Organization 请填写真实数据'])
    }
    else{
      if(_.get(values,'Organization').length < 5){
        _.set(errors,'Organization', ['Organization 请填写真实数据'])
      }
    }

    //StartDate，StopDate 不能相同
    if(_.get(values,'StopDate') < _.get(values,'StartDate')) {
      _.set(errors,'StopDate', ['StopDate 应大于等于 StartDate']);
      _.set(errors,'StartDate', ['StopDate 应大于等于 StartDate']);
    }

    return errors
  }

export {validate_baseinfocompanypermit_edit,}
