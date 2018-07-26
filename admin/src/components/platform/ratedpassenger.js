import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { SelectInput,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';



const BaseInfoPassengerTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 乘客评价信息</span>;
};

const RatedPassengerEdit = (props) => {
  return (<Edit title={<BaseInfoPassengerTitle />} {...props}>
      <SimpleForm>
        <TextInputEx label="订单号" source="OrderId"  validate={[required]}/>
          <TextField label="评价时间" source="EvaluateTime" />
          <SelectInput label="服务满意度" source="ServiceScore" choices={[
              { id: 1, name: '1分' },
              { id: 2, name: '2分' },
              { id: 3, name: '3分' },
              { id: 4, name: '4分' },
              { id: 5, name: '5分' },
          ]} />
          <SelectInput label="驾驶员满意度" source="DriverScore" choices={[
              { id: 1, name: '1分' },
              { id: 2, name: '2分' },
              { id: 3, name: '3分' },
              { id: 4, name: '4分' },
              { id: 5, name: '5分' },
          ]} />
          <SelectInput label="车辆满意度" source="VehicleScore" choices={[
              { id: 1, name: '1分' },
              { id: 2, name: '2分' },
              { id: 3, name: '3分' },
              { id: 4, name: '4分' },
              { id: 5, name: '5分' },
          ]} />
        <TextInputEx label="评价内容"  source="Detail"  validate={[required]}/>
        <TextField label="数据更新时间" source="UpdateTime"  />
      </SimpleForm>
  </Edit>);
};



const RatedPassengerList = (props) => (//
     <List title="乘客评价信息列表" {...props} >
        <Datagrid>
        <TextField label="订单号" source="OrderId" />
            <TextField label="评价时间" source="EvaluateTime" />
        <TextField label="服务满意度"  source="ServiceScore" />
        <TextField label="驾驶员满意度"  source="DriverScore" />
        <TextField label="车辆满意度"  source="VehicleScore" />
        <TextField label="评价内容"  source="Detail" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {RatedPassengerList,RatedPassengerEdit};
