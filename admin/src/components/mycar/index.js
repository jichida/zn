import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ImageField,
  TabbedForm,
  ReferenceField,
  FormTab
} from 'admin-on-rest/lib/mui';

import RichTextInput from '../controls/richtoolbar.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import moment from 'moment';

const CarTitle = ({ record }) => {
   return <span> 驾驶员车辆信息</span>;
};

const MycarEdit = (props) => {
      return (<Edit title={<CarTitle />} {...props}>
        <TabbedForm>
          <FormTab label="resources.mycar.tabs.basicinfo">
              <DisabledInput label="Id" source="id" />
          </FormTab>
          <FormTab label="resources.baseinfovehicle.tabs.tab0">
          <TextInputEx  label="车辆号牌" source="VehicleNo" />
          <TextInputEx  label="车牌颜色" source="PlateColor" />
          <NumberInputEx  label="核定载客位" source="Seats" />
          <TextInputEx  label="车辆厂牌" source="Brand" />
          <TextInputEx  label="车辆型号" source="Model" />
          <TextInputEx  label="车辆类型" source="VehicleType" />
          <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="OwnerName" />
          <TextInputEx  label="车身颜色" source="VehicleColor" />
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab1">
          <TextInputEx  label="发动机号(以机动车行驶证为准)" source="Engineld" />
          <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="VIN" />
          <DateInput  label="车辆注册日期(以机动车行驶证为准)" source="CertifyDateA" />
          <TextInputEx  label="牢辆燃料类型" source="FuelType" />
          <TextInputEx  label="发动机排量" source="EngineDisplace" />
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab2">
          <ImageInputUpload  label="车辆照片" source="PhotoldURL" />
          <TextInputEx  label="运输证字号" source="Certificate" />
          <TextInputEx  label="车辆运输证发证机构" source="TransAgency" />
          <TextInputEx  label="车辆经营区域" source="TransArea" />
          <DateInput  label="车辆运输证有效期起" source="TransDateStart" />
          <DateInput  label="车辆运输证有效期止" source="TransDateStop" />
          <DateInput  label="车辆初次登记日期" source="CertifyDateB" />
          <SelectInput  label="车辆检修状态"  source="FixState" choices={[
              { id: 0, name: '未检修' },
              { id: 1, name: '已检修' },
              { id: 2, name: '未知' },
          ]} />
          <DateInput  label="车辆下次年检时间" source="NextFixDate" />
          <TextInputEx  label="车辆年度审验状态?" source="CheckState" />
          <TextInputEx  label="发票打印设备序列号" source="FeePrintld" />
        </FormTab>


        <FormTab label="resources.baseinfovehicle.tabs.tab3">
        <TextInputEx  label="卫星定位装置品牌" source="GPSBrand" />
        <TextInputEx  label="卫星定位装置型号" source="GPSModel" />
        <TextInputEx  label="卫星定位装置IMEI号" source="GPSIMEI" />
        <DateInput  label="卫星定位设备安装日期" source="GPSlnstallDate" />
        </FormTab>

        <FormTab label="resources.baseinfovehicle.tabs.tab4">
        <DateInput  label="报备日期" source="RegisterDate" />
        <TextInputEx  label="FareType?" source="FareType" />
        </FormTab>
        </TabbedForm>
      </Edit>);

};


const MycarList = (props) => (//
     <List title="驾驶员车辆信息列表" {...props} >
        <Datagrid>
        <ReferenceField label="司机" source="creator" reference="userdriver" >
          <TextField source="username" />
        </ReferenceField>
        <TextField source="name" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {MycarList,MycarEdit};
