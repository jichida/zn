import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { ReferenceField,Filter,SelectInput,ReferenceInput,TabbedForm,FormTab,
    NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';


import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';

import Orderinfo from './orderinfo.js';

const OrderlistTitle = ({ record }) => {
   return <span>订单详情</span>;
};



const OrderlistEdit = (props) => {
      console.log('props:' + JSON.stringify(props));
    //   let getOrderinfo = (data)=>{
    //         const triptypemap = {
    //             '代驾':'daijia',
    //             '出租车':'chuzuche',
    //             '快车':'kuaiche',
    //             '旅游大巴':'lvyoudaba',
    //             '拼车':'pinche',
    //         };
    //         let label = `resources.order.tabs.${triptypemap[data.triptype]}`;
    //         return (<Orderinfo  label={label} />)
    // label="resources.order.tabs.info" 
    //   }
      return (<Edit title={<OrderlistTitle />} {...props}>
          <TabbedForm>
              <FormTab label="resources.order.tabs.basic">
               <ReferenceField label="乘客信息" source="rideruserid" reference="userrider" addLabel={true} >
                <TextField source="username" />
                </ReferenceField>
                <TextField label="订单类型"  source="triptype" />
                <DateField label="生成时间"  source="created_at" showTime />
                <TextField label="订单状态"  source="orderstatus" />
                <TextField label="金额" source="orderprice" />
                </FormTab>
                <Orderinfo label="resources.order.tabs.info" />
            </TabbedForm>
      </Edit>);

};

const OrderFilter = (props) => (
    <Filter {...props}>
        <SelectInput  label="订单类型"  source="triptype" choices={[
            { id: '旅游大巴', name: '旅游大巴' },
            { id: '快车', name: '快车' },
            { id: '出租车', name: '出租车' },
            { id: '代驾', name: '代驾' },
            { id: '拼车', name: '拼车' },
        ]} />
       <ReferenceInput label="乘客信息" source="rideruserid" reference="userrider" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
        <SelectInput source="orderstatus" choices={[
            { id: '未支付', name: '未支付' },
            { id: '已支付定金', name: '已支付定金' },
            { id: '已支付', name: '已支付' },
            { id: '已取消', name: '已取消' },
        ]} />
    </Filter>
);


const OrderlistList = (props) => (//
     <List title="订单列表" {...props} filters={<OrderFilter />} >
        <Datagrid>
        <ReferenceField label="乘客信息" source="rideruserid" reference="userrider" addLabel={false} >
            <TextField source="username" />
        </ReferenceField>
        <TextField label="订单类型"  source="triptype" />
        <DateField label="生成时间"  source="created_at" showTime />
        <TextField label="订单状态"  source="orderstatus" />
        <TextField label="金额" source="orderprice" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OrderlistList,OrderlistEdit};
