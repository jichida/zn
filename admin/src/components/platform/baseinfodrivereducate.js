import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,
 ReferenceField,ReferenceInput,SelectInput
 } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const renderDriverOptionText = (record)=>{
  return `${record.DriverName}(${record.DriverPhone})(${record.LicenseId})`;
}

const BaseInfoDriverEducatecreateTitle = ({ record }) => {
   return <span>新建 驾驶员培训信息</span>;
};
const BaseInfoDriverEducateCreate = (props) => (
       <Create {...props} title={<BaseInfoDriverEducatecreateTitle />} >
           <SimpleForm>
             <ReferenceInput label="平台关联司机" source="Platform_baseInfoDriverId" reference="baseinfodriver" allowEmpty >
                 <SelectInput optionText={renderDriverOptionText} />
              </ReferenceInput>
               <TextInputEx label="驾驶员培训课程名称"  source="CourseName"  validate={[required]}/>
               <DateInputString label="培训课程日期"  source="CourseDate"  validate={[required]}/>
               <TimePickerInput label="培训开始时间" source="StartTime" validate={[required]} defaultValue={'09:00'}/>
               <TimePickerInput label="培训结束时间" source="StopTime"  validate={[required]} defaultValue={'11:00'}/>
               <NumberInputEx label="培训时长" source="Duration"  validate={[required]} defaultValue={2}/>
           </SimpleForm>
       </Create>
);

const BaseInfoDriverEducateTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 驾驶员培训信息</span>;
};

const BaseInfoDriverEducateEdit = (props) => {
      return (<Edit title={<BaseInfoDriverEducateTitle />} {...props}>
          <SimpleForm>
            <ReferenceInput label="平台关联司机" source="Platform_baseInfoDriverId" reference="baseinfodriver" allowEmpty >
                <SelectInput optionText={renderDriverOptionText} />
             </ReferenceInput>
          <TextInputEx label="驾驶员培训课程名称"  source="CourseName"  validate={[required]}/>
          <DateInputString label="培训课程日期"  source="CourseDate"  validate={[required]}/>
          <TimePickerInput label="培训开始时间" source="StartTime"  validate={[required]} defaultValue={'09:00'}/>
          <TimePickerInput label="培训结束时间" source="StopTime"  validate={[required]} defaultValue={'11:00'}/>
          <NumberInputEx label="培训时长" source="Duration"  validate={[required]} defaultValue={2}/>
          </SimpleForm>
      </Edit>);

};




const BaseInfoDriverEducateList = (props) => (//
     <List title="驾驶员培训信息列表" {...props} >
        <Datagrid>
        <ReferenceField label="平台关联司机" source="Platform_baseInfoDriverId" reference="baseinfodriver" allowEmpty >
          <TextField source="DriverName" />
        </ReferenceField>
        <TextField label="驾驶员培训课程名称"  source="CourseName" />
        <TextField label="培训课程日期"  source="CourseDate" />
        <TextField label="培训开始时间" source="StartTime" />
        <TextField label="培训结束时间" source="StopTime" />
        <TextField label="培训时长" source="Duration" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoDriverEducateList,BaseInfoDriverEducateCreate,BaseInfoDriverEducateEdit};
