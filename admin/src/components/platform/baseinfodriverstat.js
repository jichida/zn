import React from 'react';
import {
    Datagrid,
    DateField,
    DisabledInput,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleShowLayout,
    Create,
    required,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import moment from 'moment';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import NewStatButton from './stat/NewStatButton';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';


const BaseInfoDriverStatTitle = ({ record }) => <span>驾驶员统计信息</span>;

// Address:Number,//	是数字型F6注册地行政区划代码车辆在平台的注册地， 见 GB/T2260
// LicenseId:String,	//		是	字符型V32	机动车驾驶证编号
// Cycle:Number,//	 是 数字型 F6统计周期统计周期按月 ，内容填 写统计月份 ，数据格式 YYYYMM
// OrderCount:{ type: Number, default: 0 },//		是	数字型 VIO	完成订单次数
// TafficViolationCount:{ type: Number, default: 0 },//		是	数字型V32	交通违章次数
// ComplainedCount:{ type: Number, default: 0 },//		是	数字型V32	被投诉次数
// Flag:{ type: Number, default: 1 },// Flag	是	数字型 操作标
// UpdateTime:String,//	是数字型F14更新时间网约车平台完成数据更 新的时间YYYYMMDDhhmmss
export const BaseInfoDriverStatCreate = (props) => (
       <Create {...props} title={<BaseInfoDriverStatTitle />} >
           <SimpleForm>
               <NumberInputEx label="统计周期统计周期按月,内容填写统计月份(YYYYMM)" source="Cycle"  validate={[required]} defaultValue={parseInt(moment().format('YYYYMM'))}/>
           </SimpleForm>
       </Create>
);

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const StatActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, refresh }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <FlatButton primary label="刷新" onClick={refresh} icon={<NavigationRefresh />} />
        <NewStatButton resource={resource}/>
    </CardActions>
);


export const BaseInfoDriverStatList = (props) => (//
     <List title="驾驶员统计信息" {...props} actions={<StatActions />}>
        <Datagrid>
        <TextField label="代码车辆在平台的注册地"  source="Address" />
        <TextField label="机动车驾驶证编号"  source="LicenseId" />
        <TextField label="统计周期统计周期"  source="Cycle" />
        <TextField label="完成订单次数" source="OrderCount"  />
        <TextField label="被投诉次数" source="ComplainedCount"  />
        <TextField label="更新时间" source="UpdateTime"  />
        </Datagrid>
    </List>
);
