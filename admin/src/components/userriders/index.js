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

const UserriderlistTitle = ({ record }) => {
   return <span>显示 乘客</span>;
};

const UserriderlistShow = (props) => (
       <Show title={<UserriderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="手机号" source="username" />
               <DateField label="注册时间" source="created_at"  showTime/>
               <DateField label="上次登录时间" source="updated_at"  showTime/>
               <TextField label="昵称" source="profile.nickname" />
               <DateField label="生日" source="profile.birthday" />
               <TextField label="性别" source="profile.sex" />
           </SimpleShowLayout>
       </Show>
);



const UserriderlistList = (props) => (//
     <List title="乘客列表" {...props} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="昵称" source="profile.nickname" />
        <DateField label="生日" source="profile.birthday" />
        <TextField label="性别" source="profile.sex" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {UserriderlistList,UserriderlistShow};
