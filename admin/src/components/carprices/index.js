import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {ChipField, NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,SelectInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';


const PricecreateTitle = ({ record }) => {
   return <span>新建 价格策略</span>;
};
const PricelistCreate = (props) => (
       <Create {...props} title={<PricecreateTitle />} >
           <SimpleForm>
               <SelectInput  label="注册类型"  source="registertype" choices={[
                   { id: '快车', name: '快车' },
                   { id: '出租车', name: '出租车' },
                   { id: '网约车', name: '网约车' },
               ]} />
               <NumberInput label="每公里价格"  source="priceperkm" />
               <NumberInput label="起步公里数"  source="minkem" />
               <NumberInput label="起步价"  source="minprice" />
               <TimePickerInput label="开始时间" source="starttime" />
               <TimePickerInput label="截止时间" source="endtime" />
           </SimpleForm>
       </Create>
);

const PricelistTitle = ({ record }) => {
   return <span>编辑 价格策略</span>;
};

const PricelistEdit = (props) => {
      return (<Edit title={<PricelistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <SelectInput  label="注册类型"  source="registertype" choices={[
                  { id: '快车', name: '快车' },
                  { id: '出租车', name: '出租车' },
                  { id: '网约车', name: '网约车' },
              ]} />
              <NumberInput label="每公里价格"  source="priceperkm" />
              <NumberInput label="起步公里数"  source="minkem" />
              <NumberInput label="起步价"  source="minprice" />
              <TimePickerInput label="开始时间" source="starttime" />
              <TimePickerInput label="截止时间" source="endtime" />
          </SimpleForm>
      </Edit>);

};


const PricelistShow = (props) => (
       <Show title={<PricelistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="注册类型" source="registertype" />
               <TextField label="每公里价格" source="priceperkm" />
               <TextField label="起步公里数" source="minkem" />
               <TextField label="起步价" source="minprice" />
               <TextField label="开始时间" source="starttime" />
               <TextField label="截止时间" source="endtime" />
           </SimpleShowLayout>
       </Show>
);



const PricelistList = (props) => (//
     <List title="价格策略列表" {...props} >
        <Datagrid>
        <ChipField  label="注册类型" source="registertype" />
        <TextField label="每公里价格" source="priceperkm" />
        <TextField label="起步公里数" source="minkem" />
        <TextField label="起步价" source="minprice" />
        <TextField label="开始时间" source="starttime" />
        <TextField label="截止时间" source="endtime" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {PricelistList,PricelistCreate,PricelistEdit,PricelistShow};
