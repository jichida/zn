import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Edit as EditPage, NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';


const OperateLoginTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>车辆经营上线</span>;
};

const OperateLoginEdit = (props) => (
       <EditPage {...props} title={<OperateLoginTitle />}>
           <SimpleForm>
             <TextField label="机动车驾驶证号" source="LicenseId" />
             <TextField label="车辆号牌" source="VehicleNo" />
             <TextField label="车辆经营上线时间" source="LoginTime" showTime/>
             <TextField label="上线经度" source="Longitude" />
             <TextField label="上线纬度" source="Latitude" />
             <TextField label="坐标加密标识" source="Encrypt" />
           </SimpleForm>
       </EditPage>
);

const OperateLoginShow = (props) => (
       <Show title={<OperateLoginTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="机动车驾驶证号" source="LicenseId" />
           <TextField label="车辆号牌" source="VehicleNo" />
           <DateField label="车辆经营上线时间" source="LoginTime" showTime/>
           <TextField label="上线经度" source="Longitude" />
           <TextField label="上线纬度" source="Latitude" />
           <TextField label="坐标加密标识" source="Encrypt" />
           </SimpleShowLayout>
       </Show>
);



const OperateLoginList = (props) => (//
     <List title="车辆经营上线列表" {...props}  sort={{ field: 'LoginTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="机动车驾驶证号" source="LicenseId" />
        <TextField label="车辆号牌" source="VehicleNo" />
        <DateField label="车辆经营上线时间" source="LoginTime" showTime/>
        <TextField label="上线经度" source="Longitude" />
        <TextField label="上线纬度" source="Latitude" />
        <TextField label="坐标加密标识" source="Encrypt" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OperateLoginList,OperateLoginEdit};
