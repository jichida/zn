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

const validate_baseinfodriver_edit = (values) => {
    const errors = {};
    //341100
    if (_.get(values,'Address') != '341100') {
        _.set(errors,'Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    // DriverName字段请填写
    if (!_.get(values,'DriverName')) {
        _.set(errors,'DriverName', ['DriverName字段请填写']);
    }

    // DriverGender字段请填写（1 男   2 女）
    if (!_.get(values,'DriverGender')) {
        _.set(errors,'DriverGender',['DriverGender字段请填写'])
    }
    else{
      if(_.get(values,'DriverGender') !== '2' && _.get(values,'DriverGender') !=='1'){
        _.set(errors,'DriverGender', ['1 男   2 女']);
      }
    }

    // DriverNationality请填写
    if (!_.get(values,'DriverNationality')) {
        _.set(errors,'DriverNationality', ['DriverNationality字段请填写']);
    }

    // DriverNation请填写（eg 汉族，满族）
    if (!_.get(values,'DriverNation')) {
        _.set(errors,'DriverNation', ['DriverNation请填写（eg 汉族，满族）'])
    }
    // DriverLicenseOff应大于DriverLicenseOn
    if(_.get(values,'DriverLicenseOff') <= _.get(values,'DriverLicenseOn')) {
      _.set(errors,'DriverLicenseOff', ['DriverLicenseOff应大于DriverLicenseOn']);
      _.set(errors,'DriverLicenseOn' , ['DriverLicenseOff应大于DriverLicenseOn']);
    }
    //NetworkCarProofOff应大于NetworkCarProofOn
    if(_.get(values,'NetworkCarProofOff') <= _.get(values,'NetworkCarProofOn')) {
      _.set(errors,'NetworkCarProofOff', ['NetworkCarProofOff应大于NetworkCarProofOn']);
      _.set(errors,'NetworkCarProofOn', ['NetworkCarProofOff应大于NetworkCarProofOn']);
    }
    //ContractOff应大于ContractOn
    if(_.get(values,'ContractOff') <= _.get(values,'ContractOn')) {
      _.set(errors,'ContractOff', ['ContractOff应大于ContractOn']);
      _.set(errors,'ContractOn', ['ContractOff应大于ContractOn']);
    }
    // ContractCompany字段请正确填写
    if (!_.get(values,'ContractCompany')) {
        _.set(errors,'ContractCompany', ['ContractCompany字段请正确填写）'])
    }

    // DriverMaritalStatus，DriverLanguageLevel，DriverEducation，DriverCensus，DriverAddress，PhotoId，LicensePhotoId，
    //EmergencyContact，EmergencyContactPhone，EmergencyContactAddress请填写
    if (!_.get(values,'DriverMaritalStatus')) {
        _.set(errors,'DriverMaritalStatus', ['DriverMaritalStatus请填写'])
    }
    if (!_.get(values,'DriverLanguageLevel')) {
        _.set(errors,'DriverLanguageLevel', ['DriverLanguageLevel 请填写'])
    }
    if (!_.get(values,'DriverEducation')) {
        _.set(errors,'DriverEducation', ['DriverEducation 请填写'])
    }
    if (!_.get(values,'DriverCensus')) {
        _.set(errors,'DriverCensus', ['DriverCensus 请填写'])
    }
    if (!_.get(values,'DriverAddress')) {
        _.set(errors,'DriverAddress', ['DriverAddress 请填写'])
    }
    if (!_.get(values,'EmergencyContact')) {
        _.set(errors,'EmergencyContact', ['EmergencyContact 请填写'])
    }
    if (!_.get(values,'EmergencyContactPhone')) {
        _.set(errors,'EmergencyContactPhone', ['EmergencyContactPhone 请填写'])
    }
    if (!_.get(values,'EmergencyContactAddress')) {
        _.set(errors,'EmergencyContactAddress', ['EmergencyContactAddress 请填写'])
    }

    return errors
};

export {validate_baseinfodriver_edit,}
