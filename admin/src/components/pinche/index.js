import React from 'react';

import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import {
  CreateButton,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  SelectInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Filter,
  BooleanInput,
  BooleanField,
  ReferenceField
} from 'admin-on-rest/lib/mui';

import {TabbedForm,FormTab} from 'admin-on-rest/lib/mui';
//import CreateButton from './buttons/create-button.js';
import { Field,FieldArray } from 'redux-form';

import { translate } from 'admin-on-rest';
import {TextFieldSZ,TextInputSZ} from '../controls/tags.js';
import {TimePickerInput} from '../controls/timepicker.js';


import RoutePrice from './routeprice.js';
import RoutePriceShow from './routepriceshow.js';
import MyCopyButton from './mycopybutton.js';

const BuscarpoolcreateTitle = translate(({ record, translate })  => {
   return <span>新建 拼车路线</span>;
});
const BuscarpoolCreate = (props) => (
       <Create {...props} title={<BuscarpoolcreateTitle />} >
           <SimpleForm>
           <SelectInput  label="拼车类型"  source="pinchetype" choices={[
               { id: '专线', name: '专线' },
               { id: '人气团拼', name: '人气团拼' },
           ]} />
           <TextInput label="开始城市" source="startcity" />
           <TextInput label="目的城市" source="endcity" />
           <DateInput label="出发日期" source="startdate" />
           <TimePickerInput label="出发时间" source="starttime" />
           <NumberInput label="座位数"  source="seatnumber" />
           <TextInput label="状态"  source="status" />
           <DisabledInput label="已定座位"  source="takennumber" />
           <TextInputSZ label="开始站点" source="startstations" addLabel={true}/>
           <TextInputSZ label="目的站点" source="endstations" addLabel={true}/>
           <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const BuscarpoolTitle = ({ record }) => {
   return <span>编辑 拼车路线</span>;
};

const BuscarpoolEdit = (props) => {
      return (<Edit title={<BuscarpoolTitle />} {...props}>
          <TabbedForm>
              <FormTab label="resources.buscarpool.tabs.citystation">

                <TextInputSZ label="开始站点" source="startstations" addLabel={true}/>
                <TextInputSZ label="目的站点" source="endstations" addLabel={true}/>
                <RoutePrice label="编辑站点价格" source="carpoolprice" addLabel={true}/>

              </FormTab>
              <FormTab label="resources.buscarpool.tabs.basicinfo">
                <DisabledInput label="Id" source="id" />
                <SelectInput  label="拼车类型"  source="pinchetype" choices={[
                    { id: '专线', name: '专线' },
                    { id: '人气团拼', name: '人气团拼' },
                ]} />
                <TextInput label="开始城市" source="startcity" />
                <TextInput label="目的城市" source="endcity" />
                <DateInput label="出发日期" source="startdate" />
                <TimePickerInput label="出发时间" source="starttime" />
                <TextField label="座位数" source="seatnumber" />
                <TextField label="已定座位数" source="takennumber" />
                <TextField label="状态" source="status" />
                <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
              </FormTab>

              </TabbedForm>
      </Edit>);

};

const BuscarpoolTitle2 = ({ record }) => {
   return <span>显示 拼车路线</span>;
};

const BuscarpoolShow = (props) => {
  return (<Show title={<BuscarpoolTitle2 />} {...props} >
              <TabbedForm>
              <FormTab label="resources.buscarpool.tabs.citystation">
                <RoutePriceShow label="路线价格" source="carpoolprice" />
               </FormTab>
               <FormTab label="resources.buscarpool.tabs.basicinfo">
               <TextField source="id" />
               <TextField label="拼车类型" source="pinchetype" />
               <TextField label="开始城市" source="startcity" />
               <TextField label="目的城市" source="endcity" />
               <DateField label="出发日期" source="startdate" type="date" />
               <TextField label="出发时间" source="starttime" />
               <BooleanField label="是否启用" source="isenabled" />
               </FormTab>
               <FormTab label="resources.buscarpool.tabs.passenager">
               <ReferenceManyField reference="order" target="buscarpoolid" label="resources.buscarpool.fields.passenager" perPage={5} addLabel={false}>
               <Datagrid>
                    <ReferenceField label="乘客信息" source="rideruserid" reference="userrider" addLabel={false}>
                        <TextField source="username" />
                    </ReferenceField>
                    <TextField label="开始站点" source="startstation" />
                    <TextField label="目的站点" source="endstation" />
                    <TextField label="座位数" source="seatnumber" />
                    <TextField label="订单状态" source="orderstatus" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
               </FormTab>
              </TabbedForm>
       </Show>
  );
}

const BuscarpoolFilter = (props) => (
    <Filter {...props}>
        <SelectInput  label="拼车类型"  source="pinchetype" choices={[
            { id: '专线', name: '专线' },
            { id: '人气团拼', name: '人气团拼' },
        ]} />
        <DateInput label="出发日期" source="startdate" />
    </Filter>
);

import EditButtonInList from './editbtninlist.js';
const BuscarpoollistTitle = translate(({ record, translate })  => {
   return <span>拼车列表</span>;
});
const BuscarpoolList = (props) => (//
     <List title={<BuscarpoollistTitle />} {...props} filters={<BuscarpoolFilter />}  perPage={25} sort={{ field: 'startdate', order: 'DESC' }}>
        <Datagrid>
        <TextField label="拼车类型" source="pinchetype" />
        <TextField label="开始城市" source="startcity" />
        <DateField label="出发日期" source="startdate" type="date" />
        <TextField label="出发时间" source="starttime" />
        <TextField label="目的城市" source="endcity" />
        <TextField label="已定座位数" source="takennumber" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButtonInList />
        <ShowButton />
        <MyCopyButton />
        </Datagrid>
    </List>
);


export  {BuscarpoolList,BuscarpoolCreate,BuscarpoolEdit,BuscarpoolShow};
