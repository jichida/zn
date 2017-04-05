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
  BooleanField
} from 'admin-on-rest/lib/mui';

import {TabbedForm,FormTab} from 'admin-on-rest/lib/mui';
//import CreateButton from './buttons/create-button.js';
import { Field,FieldArray } from 'redux-form';

import { translate } from 'admin-on-rest';
import {TextFieldSZ,TextInputSZ} from '../controls/tags.js';
import {TimePickerInput} from '../controls/timepicker.js';


import RoutePrice from './routeprice.js';
import RoutePriceShow from './routepriceshow.js';

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
           <TextInputSZ label="开始站点" source="startstations" />
           <TextInputSZ label="目的站点" source="endstations" />
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

                <TextInputSZ label="开始站点" source="startstations" />
                <TextInputSZ label="目的站点" source="endstations" />
                <RoutePrice source="carpoolprice"/>

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
  return (<Show title={<BuscarpoolTitle2 />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="拼车类型" source="pinchetype" />
               <TextField label="开始城市" source="startcity" />
               <TextField label="目的城市" source="endcity" />
               <DateField label="出发日期" source="startdate" type="date" />
               <TextField label="出发时间" source="starttime" />
               <DateField label="新建时间" source="created_at" type="date" />
               <TextField label="已定座位数" source="takennumber" />
               <RoutePriceShow label="路线价格" source="carpoolprice" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
  );
}

import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';
const MyCopyButton = ({basePath = '', record = {}, label = '复制到明天'}) => {
  let onClickCopy =()=>{

    // store.dispatch({type:'server/admin', data:{
    //   cmd:'copycarpool',
    //   data:{
    //     id:record.id,
    //   }
    // }});
  }
  return (<FlatButton
    onClick={onClickCopy}
    primary
    label={label}
    icon={<ImageEye />}
    style={{ overflow: 'inherit' }}
  />);
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
     <List title={<BuscarpoollistTitle />} {...props} filters={<BuscarpoolFilter />}  perPage={25} >
        <Datagrid>
        <TextField label="拼车类型" source="pinchetype" />
        <TextField label="开始城市" source="startcity" />
        <DateField label="出发日期" source="startdate" type="date" />
        <TextField label="出发时间" source="starttime" />
        <DateField label="新建时间" source="created_at" type="date" />
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
