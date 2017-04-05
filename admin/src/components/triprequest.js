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
import {TimePickerInput} from './controls/timepicker.js';

const TriprequestlistTitle = ({ record }) => {
   return <span>显示 行程</span>;
};

const TriprequestlistShow = (props) => (
       <Show title={<TriprequestlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="乘客信息" source="rideruserid" />
               <TextField label="司机信息" source="driveruserId" />
               <TextField label="行程类型"  source="triptype" />
               <TextField label="生成时间"  source="created_at" />
               <TextField label="状态"  source="requeststatus" />
               <TextField label="行程开始时间" source="showtimestring" />
               <TextField label="起始地" source="srcaddress.addressname" />
               <TextField label="目的地" source="dstaddress.addressname" />
           </SimpleShowLayout>
       </Show>
);



const TriprequestlistList = (props) => (//
     <List title="行程列表" {...props} >
        <Datagrid>
        <TextField label="乘客信息" source="rideruserid" />
        <TextField label="司机信息" source="driveruserId" />
        <TextField label="行程类型"  source="triptype" />
        <TextField label="生成时间"  source="created_at" />
        <TextField label="状态"  source="requeststatus" />
        <TextField label="行程开始时间" source="showtimestring" />
        <TextField label="起始地" source="srcaddress.addressname" />
        <TextField label="目的地" source="dstaddress.addressname" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {TriprequestlistList,TriprequestlistShow};
