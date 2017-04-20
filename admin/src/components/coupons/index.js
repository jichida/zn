import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';

const CouponcreateTitle = ({ record }) => {
   return <span>新建 优惠券</span>;
};
const CouponlistCreate = (props) => (
       <Create {...props} title={<CouponcreateTitle />} >
           <SimpleForm>
               <TextInput label="名字" source="name" />
               <TextInput label="过期时间"  source="expdate" />
               <TextInput label="类型"  source="type" />
               <NumberInput label="最高抵扣"  source="maxprice" />
               <TextInput label="限城市" source="onlycity" />
               <NumberInput label="面额" source="value" />
               <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const CouponlistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 优惠券</span>;
};

const CouponlistEdit = (props) => {
      return (<Edit title={<CouponlistTitle />} {...props}>
          <SimpleForm>
            <TextInput label="名字" source="name" />
            <TextInput label="过期时间"  source="expdate" />
            <TextInput label="类型"  source="type" />
            <NumberInput label="最高抵扣"  source="maxprice" />
            <TextInput label="限城市" source="onlycity" />
            <NumberInput label="面额" source="value" />
            <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const CouponlistShow = (props) => (
       <Show title={<CouponlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="名字" source="name" />
               <TextField label="过期时间"  source="expdate" />
               <TextField label="类型"  source="type" />
               <TextField label="最高抵扣"  source="maxprice" />
               <TextField label="限城市" source="onlycity" />
               <TextField label="面额" source="value" />
               <TextField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const CouponlistList = (props) => (//
     <List title="优惠券列表" {...props} >
        <Datagrid>
        <TextField label="名字" source="name" />
        <TextField label="过期时间"  source="expdate" />
        <TextField label="类型"  source="type" />
        <TextField label="最高抵扣"  source="maxprice" />
        <TextField label="限城市" source="onlycity" />
        <TextField label="面额" source="value" />
        <TextField label="是否启用" source="isenabled" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {CouponlistList,CouponlistCreate,CouponlistEdit,CouponlistShow};
