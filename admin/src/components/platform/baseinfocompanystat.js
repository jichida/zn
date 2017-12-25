import React from 'react';
import {
    Create,
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
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';

const BaseInfoCompanyStatTitle = ({ record }) => <span>营运规模信息</span>;

export const BaseInfoCompanyStatList = (props) => (//
     <List title="营运规模信息" {...props} >
        <Datagrid>
        <TextField label="平台注册网约车辆数"  source="VehicleNum" />
        <TextField label="平台注册驾驶员数"  source="DriverNum" />
        <TextField label="数据更新时间" source="UpdateTime" showTime />
        </Datagrid>
    </List>
);
