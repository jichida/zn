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

const UserdriverlistTitle = ({ record }) => {
   return <span>显示 司机</span>;
};

const UserdriverlistShow = (props) => (
       <Show title={<UserdriverlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="手机号" source="username" />
               <TextField label="注册时间"  source="created_at" />
               <TextField label="上次登录时间"  source="updated_at" />
               <TextField label="昵称" source="profile.nickname" />
               <TextField label="生日" source="profile.birthday" />
               <TextField label="性别" source="profile.sex" />
               <TextField label="车辆类型" source="profile.carname" />
               <TextField label="车牌号" source="profile.carid" />
           </SimpleShowLayout>
       </Show>
);



const UserdriverlistList = (props) => (//
     <List title="司机列表" {...props} >
        <Datagrid>
        <TextField label="手机号" source="username" />
        <TextField label="注册时间"  source="created_at" />
        <TextField label="上次登录时间"  source="updated_at" />
        <TextField label="昵称" source="profile.nickname" />
        <TextField label="生日" source="profile.birthday" />
        <TextField label="性别" source="profile.sex" />
        <TextField label="车辆类型" source="profile.carname" />
        <TextField label="车牌号" source="profile.carid" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {UserdriverlistList,UserdriverlistShow};
