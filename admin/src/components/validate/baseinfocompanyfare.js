import _ from 'lodash';
// address应与4.1相对应
// FareType应相同
// FareTypeNote 需填写中文说明
// FareValidOn，FareValidOff不能相同且要符合逻辑
// OtherPeakTimeOn，OtherPeakTimeOff字段需要填写

const validate_baseinfocompanyfare_edit = (values) => {
    const errors = {};
    //341100
    if (_.get(values,'Address') != '341100') {
        _.set(errors,'Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    //Certificate 请填写真实数据
    if (!_.get(values,'FareTypeNote')) {
        _.set(errors,'FareTypeNote', ['FareTypeNote 需填写中文说明'])
    }
    else{
      if(_.get(values,'FareTypeNote').length < 3){
        _.set(errors,'FareTypeNote', ['FareTypeNote 需填写中文说明'])
      }
    }

    if (!_.get(values,'OtherPeakTimeOff')) {
        _.set(errors,'OtherPeakTimeOff', ['OtherPeakTimeOff 请填写真实数据'])
    }

    if (!_.get(values,'OtherPeakTimeOn')) {
        _.set(errors,'OtherPeakTimeOn', ['OtherPeakTimeOn 请填写真实数据'])
    }

    //FareValidOn，FareValidOff不能相同且要符合逻辑
    if(_.get(values,'FareValidOff') <= _.get(values,'FareValidOn')) {
      _.set(errors,'FareValidOn', ['FareValidOff 应大于 FareValidOn']);
      _.set(errors,'FareValidOff', ['FareValidOff 应大于 FareValidOn']);
    }

    //OtherPeakTimeOn，OtherPeakTimeOff字段需要填写
    if(_.get(values,'OtherPeakTimeOff') <= _.get(values,'OtherPeakTimeOn')) {
      _.set(errors,'OtherPeakTimeOn', ['OtherPeakTimeOff 应大于 OtherPeakTimeOn']);
      _.set(errors,'OtherPeakTimeOff', ['OtherPeakTimeOff 应大于 OtherPeakTimeOn']);
    }


    return errors
  }

export {validate_baseinfocompanyfare_edit,}
