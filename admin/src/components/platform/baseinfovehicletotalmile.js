import React from 'react';
import { connect } from 'react-redux';
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
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import NewStatButton from './stat/NewStatButton';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {refreshView} from 'admin-on-rest';

const BaseInfoVehicleTotalMileTitle = ({ record }) => <span>车辆里程信息</span>;

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

let StatActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter,dispatch }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <FlatButton primary label="刷新" onClick={()=>{
          dispatch(refreshView());
        }} icon={<NavigationRefresh />} />
        <NewStatButton resource={resource}/>
    </CardActions>
);
StatActions = connect()(StatActions);

export const BaseInfoVehicleTotalMileList = (props) => (//
     <List title="车辆里程信息" {...props}  actions={<StatActions />}>
        <Datagrid>
        <TextField label="车辆行政区域"  source="Address" />
        <TextField label="车辆号牌[*使用注册公司当地车牌号码]"  source="VehicleNo" />
        <TextField label="行驶总里程"  source="TotalMile" />
        <TextField label="更新时间"  source="UpdateTime" />
        </Datagrid>
    </List>
);
