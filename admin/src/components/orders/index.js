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


const OrderlistTitle = ({ record }) => {
   return <span>显示 订单</span>;
};

const OrderlistShow = (props) => (
       <Show title={<OrderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="乘客信息" source="rideruserid" />
               <TextField label="订单类型"  source="triptype" />
               <TextField label="生成时间"  source="created_at" />
               <TextField label="订单状态"  source="orderstatus" />
               <TextField label="金额" source="totalamount" />
               <TextField label="支付" source="paytype" />
           </SimpleShowLayout>
       </Show>
);



const OrderlistList = (props) => (//
     <List title="订单列表" {...props} >
        <Datagrid>
        <TextField label="乘客信息" source="rideruserid" />
        <TextField label="订单类型"  source="triptype" />
        <TextField label="生成时间"  source="created_at" />
        <TextField label="订单状态"  source="orderstatus" />
        <TextField label="金额" source="totalamount" />
        <TextField label="支付" source="paytype" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OrderlistList,OrderlistShow};
