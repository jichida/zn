import _ from 'lodash';
// address应与4.1相对应
// DriverName字段请填写
// DriverGender字段请填写（1 男   2 女）
// DriverNationality请填写
// DriverNation请填写（eg 汉族，满族）
// DriverMaritalStatus，DriverLanguageLevel，DriverEducation，DriverCensus，DriverAddress，PhotoId，LicensePhotoId，EmergencyContact，EmergencyContactPhone，EmergencyContactAddress请填写
// DriverLicenseOff应大于DriverLicenseOn
// NetworkCarProofOff应大于NetworkCarProofOn
// ContractCompany字段请正确填写
// ContractOff应大于ContractOn

const validate_baseinfovehicle_edit = (values) => {
    const errors = {};
    //============================================================================================
    //341100
    if (_.get(values,'Address') != '341100') {
        _.set(errors,'Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    //CheckState
    if(_.get(values,'CheckState') !== '0'
    && _.get(values,'CheckState') !=='1'
    && _.get(values,'CheckState') !=='2'
    ){
      _.set(errors,'CheckState', ['0 未年审 1 年审合格 2 年审不合格']);
    }

    //Certificate 字段请填写
    if(_.get(values,'Certificate','')  === ''    ){
      _.set(errors,'Certificate', ['Certificate 请填写']);
    }

    //TransDateStop 请按正确逻辑填写
    if(_.get(values,'TransDateStop ','') === ''    ){
      _.set(errors,'TransDateStop ', ['TransDateStop 请按正确逻辑填写']);
    }

    //TransDateStop 请按正确逻辑填写
    if(_.get(values,'TransDateStop ','') === ''    ){
      _.set(errors,'TransDateStop ', ['TransDateStop 请按正确逻辑填写']);
    }

    //NextFixDate  请按正确逻辑填写 请填写
    if(_.get(values,'NextFixDate','') === ''    ){
      _.set(errors,'NextFixDate', ['NextFixDate  请按正确逻辑填写']);
    }

    //NextFixDate 应大于 CertifyDateA
    if(_.get(values,'NextFixDate') <= _.get(values,'CertifyDateA')) {
      _.set(errors,'NextFixDate', ['NextFixDate 应大于 CertifyDateA']);
      _.set(errors,'CertifyDateA', ['NextFixDate 应大于 CertifyDateA']);
    }

    //GPSIMEI  请填写
    if(_.get(values,'GPSIMEI','') === ''    ){
      _.set(errors,'GPSIMEI', ['GPSIMEI 请填写']);
    }

    //EngineDisplace
    if(_.get(values,'EngineDisplace',0) < 700    ){
      _.set(errors,'EngineDisplace', ['EngineDisplace请正确填写  单位:毫升']);
    }

    //FareType请与A4.6相对应
    if(_.get(values,'FareType','') === ''    ){
      _.set(errors,'FareType', ['FareType请与A4.6相对应']);
    }

    return errors
};

export {validate_baseinfovehicle_edit,}
