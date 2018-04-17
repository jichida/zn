import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Edit as EditPage,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';


const OrderCreateTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>订单发起</span>;
};


// const OrderCreateShow = (props) => (
//        <Show title={<OrderCreateTitle />} {...props}>
//            <SimpleShowLayout>
//                <TextField label="订单编号" source="OrderId" />
//                <TextField label="预计用车时间"  source="DepartTime"  />
//                <TextField label="订单发起时间"  source="OrderTime"  />
//                <TextField label="乘客备注"  source="PassengerNote" />
//                <TextField label="预计出发地点详细地址" source="Departure" />
//                <TextField label="预计出发地点经度" source="DepLongitude" />
//                <TextField label="预计出发地点纬度" source="DepLatitude" />
//                <TextField label="预计目的地" source="Destination" />
//                <TextField label="预计目的地经度" source="DestLongitude" />
//                <TextField label="预计目的地纬度" source="DestLatitude" />
//                <TextField label="坐标加密标识" source="Encrypt" />
//                <TextField label="运价类型编码" source="FareType" />
//            </SimpleShowLayout>
//        </Show>
// );
const OrderCreateEdit = (props) => (
   <EditPage {...props} title={<OrderCreateTitle />}>
       <SimpleForm>
           <TextField label="订单编号" source="OrderId" />
           <TextField label="行政区划代码" source="Address" />
           <TextField label="预计用车时间"  source="DepartTime"  />
           <TextField label="订单发起时间"  source="OrderTime"  />
           <TextField label="乘客备注"  source="PassengerNote" />
           <TextField label="预计出发地点详细地址" source="Departure" />
           <TextField label="预计出发地点经度" source="DepLongitude" />
           <TextField label="预计出发地点纬度" source="DepLatitude" />
           <TextField label="预计目的地" source="Destination" />
           <TextField label="预计目的地经度" source="DestLongitude" />
           <TextField label="预计目的地纬度" source="DestLatitude" />
           <TextField label="坐标加密标识" source="Encrypt" />
           <TextField label="运价类型编码" source="FareType" />
           <TextField label="操作标识" source="Flag"  />
           <TextField label="数据更新时间" source="UpdateTime"  />
       </SimpleForm>
   </EditPage>
);


const OrderCreateList = (props) => (//
     <List title="订单生成列表" {...props} sort={{ field: 'OrderTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单编号" source="OrderId" />
        <TextField label="行政区划代码" source="Address" />
        <TextField label="预计用车时间"  source="DepartTime"  />
        <TextField label="订单发起时间"  source="OrderTime"  />
        <TextField label="预计出发地点详细地址" source="Departure" />
        <TextField label="预计目的地" source="Destination" />
        <TextField label="运价类型编码" source="FareType" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OrderCreateList,OrderCreateEdit};
