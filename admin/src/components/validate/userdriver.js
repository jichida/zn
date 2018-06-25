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

const validate_userdriver_edit = (values) => {
    const errors = {};
    //341100
    if (!_.get(values,'Platform_baseInfoDriver.Address') !== '341100') {
        _.set(errors,'Platform_baseInfoDriver.Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    // DriverName字段请填写
    if (!_.get(values,'Platform_baseInfoDriver.DriverName')) {
        _.set(errors,'Platform_baseInfoDriver.DriverName', ['DriverName字段请填写']);
    }

    // DriverGender字段请填写（1 男   2 女）
    if (!_.get(values,'Platform_baseInfoDriver.DriverGender')) {
        _.set(errors,'Platform_baseInfoDriver.DriverGender',['DriverGender字段请填写'])
    }
    else{
      if(_.get(values,'Platform_baseInfoDriver.DriverGender') !== '2' && _.get(values,'Platform_baseInfoDriver.DriverGender') !=='1'){
        _.set(errors,'Platform_baseInfoDriver.DriverGender', ['1 男   2 女']);
      }
    }

    // DriverNationality请填写
    if (!_.get(values,'Platform_baseInfoDriver.DriverNationality')) {
        _.set(errors,'Platform_baseInfoDriver.DriverNationality', ['DriverNationality字段请填写']);
    }

    // DriverNation请填写（eg 汉族，满族）
    if (!_.get(values,'Platform_baseInfoDriver.DriverNation')) {
        _.set(errors,'Platform_baseInfoDriver.DriverNation', ['DriverNation请填写（eg 汉族，满族）'])
    }
    // DriverLicenseOff应大于DriverLicenseOn
    if(_.get(values,'Platform_baseInfoDriver.DriverLicenseOff') <= _.get(values,'Platform_baseInfoDriver.DriverLicenseOn')) {
      _.set(errors,'Platform_baseInfoDriver.DriverLicenseOff', ['DriverLicenseOff应大于DriverLicenseOn']);
      _.set(errors,'Platform_baseInfoDriver.DriverLicenseOn' , ['DriverLicenseOff应大于DriverLicenseOn']);
    }
    //NetworkCarProofOff应大于NetworkCarProofOn
    if(_.get(values,'Platform_baseInfoDriver.NetworkCarProofOff') <= _.get(values,'Platform_baseInfoDriver.NetworkCarProofOn')) {
      _.set(errors,'Platform_baseInfoDriver.NetworkCarProofOff', ['NetworkCarProofOff应大于NetworkCarProofOn']);
      _.set(errors,'Platform_baseInfoDriver.NetworkCarProofOn', ['NetworkCarProofOff应大于NetworkCarProofOn']);
    }
    //ContractOff应大于ContractOn
    if(_.get(values,'Platform_baseInfoDriver.ContractOff') <= _.get(values,'Platform_baseInfoDriver.ContractOn')) {
      _.set(errors,'Platform_baseInfoDriver.ContractOff', ['ContractOff应大于ContractOn']);
      _.set(errors,'Platform_baseInfoDriver.ContractOn', ['ContractOff应大于ContractOn']);
    }
    // ContractCompany字段请正确填写
    if (!_.get(values,'Platform_baseInfoDriver.ContractCompany')) {
        _.set(errors,'Platform_baseInfoDriver.ContractCompany', ['ContractCompany字段请正确填写）'])
    }

    // DriverMaritalStatus，DriverLanguageLevel，DriverEducation，DriverCensus，DriverAddress，PhotoId，LicensePhotoId，
    //EmergencyContact，EmergencyContactPhone，EmergencyContactAddress请填写
    if (!_.get(values,'Platform_baseInfoDriver.DriverMaritalStatus')) {
        _.set(errors,'Platform_baseInfoDriver.DriverMaritalStatus', ['DriverMaritalStatus请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.DriverLanguageLevel')) {
        _.set(errors,'Platform_baseInfoDriver.DriverLanguageLevel', ['DriverLanguageLevel 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.DriverEducation')) {
        _.set(errors,'Platform_baseInfoDriver.DriverEducation', ['DriverEducation 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.DriverCensus')) {
        _.set(errors,'Platform_baseInfoDriver.DriverCensus', ['DriverCensus 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.DriverAddress')) {
        _.set(errors,'Platform_baseInfoDriver.DriverAddress', ['DriverAddress 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.EmergencyContact')) {
        _.set(errors,'Platform_baseInfoDriver.EmergencyContact', ['EmergencyContact 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.EmergencyContactPhone')) {
        _.set(errors,'Platform_baseInfoDriver.EmergencyContactPhone', ['EmergencyContactPhone 请填写'])
    }
    if (!_.get(values,'Platform_baseInfoDriver.EmergencyContactAddress')) {
        _.set(errors,'Platform_baseInfoDriver.EmergencyContactAddress', ['EmergencyContactAddress 请填写'])
    }

    //============================================================================================
    //341100
    if (!_.get(values,'Platform_baseInfoVehicle.Address') !== '341100') {
        _.set(errors,'Platform_baseInfoVehicle.Address', ['address应与4.1相对应,为统一方便,固定写341100吧']);
    }
    //Platform_baseInfoVehicle.CheckState
    if(_.get(values,'Platform_baseInfoVehicle.CheckState') !== '0'
    && _.get(values,'Platform_baseInfoVehicle.CheckState') !=='1'
    && _.get(values,'Platform_baseInfoVehicle.CheckState') !=='2'
    ){
      _.set(errors,'Platform_baseInfoVehicle.CheckState', ['0 未年审 1 年审合格 2 年审不合格']);
    }

    //Certificate 字段请填写
    if(_.get(values,'Platform_baseInfoVehicle.Certificate','')  === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.Certificate', ['Certificate 请填写']);
    }

    //TransDateStop 请按正确逻辑填写
    if(_.get(values,'Platform_baseInfoVehicle.TransDateStop ','') === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.TransDateStop ', ['TransDateStop 请按正确逻辑填写']);
    }

    //TransDateStop 请按正确逻辑填写
    if(_.get(values,'Platform_baseInfoVehicle.TransDateStop ','') === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.TransDateStop ', ['TransDateStop 请按正确逻辑填写']);
    }

    //NextFixDate  请按正确逻辑填写 请填写
    if(_.get(values,'Platform_baseInfoVehicle.NextFixDate','') === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.NextFixDate', ['NextFixDate  请按正确逻辑填写']);
    }

    //NextFixDate 应大于 CertifyDateA
    if(_.get(values,'Platform_baseInfoVehicle.NextFixDate') <= _.get(values,'Platform_baseInfoVehicle.CertifyDateA')) {
      _.set(errors,'Platform_baseInfoVehicle.NextFixDate', ['NextFixDate 应大于 CertifyDateA']);
      _.set(errors,'Platform_baseInfoVehicle.CertifyDateA', ['NextFixDate 应大于 CertifyDateA']);
    }

    //GPSIMEI  请填写
    if(_.get(values,'Platform_baseInfoVehicle.GPSIMEI','') === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.GPSIMEI', ['GPSIMEI 请填写']);
    }

    //Platform_baseInfoVehicle.EngineDisplace
    if(_.get(values,'Platform_baseInfoVehicle.EngineDisplace',0) < 700    ){
      _.set(errors,'Platform_baseInfoVehicle.EngineDisplace', ['EngineDisplace请正确填写  单位:毫升']);
    }

    //FareType请与A4.6相对应
    if(_.get(values,'Platform_baseInfoVehicle.FareType','') === ''    ){
      _.set(errors,'Platform_baseInfoVehicle.FareType', ['FareType请与A4.6相对应']);
    }

    return errors
};

export {validate_userdriver_edit,}
