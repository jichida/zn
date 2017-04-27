import React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
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
    Show,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';

import ShowPageOne from '../controls/singlelistpage.js';
import ShowPage from '../controls/ShowPage.js';
import EditPage from '../controls/EditPage.js';


const BaseInfoCompanyStatTitle = ({ record }) => <span>营运规模信息</span>;
const BaseInfoCompanyStatShow = (props) => (
       <ShowPage title={<BaseInfoCompanyStatTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="平台注册网约车辆数"  source="VehicleNum" />
           <TextField label="平台注册驾驶员数"  source="DriverNum" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoCompanyStatShow};
export const BaseInfoCompanyStatList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={BaseInfoCompanyStatShow} hasEdit={false}/>
);
