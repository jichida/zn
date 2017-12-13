import React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
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
    Create,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';

import ShowPageOne from '../singledocumentpage/index.js';

import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';


const BaseInfoCompanyPermitTitle = ({ record }) => <span>经营许可信息</span>;

 const BaseInfoCompanyPermitCreate = (props) => (
    <Create {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <DisabledInputEx  label="公司名称" source="CompanyName" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" />
            <TextInputEx label="经营区域"  source="OperationArea" />
            <TextInputEx label="公司名称"  source="OwnerName" />
            <TextInputEx label="发证机构名称"  source="Organization" />
            <DateInput label="有效期起" source="StartDate" />
            <DateInput label="有效期止" source="StopDate" />
            <DateInput label="初次发证日期" source="CertifyDate" />
            <DisabledInputEx label="状态"  source="State" />
            <DateField label="数据更新时间" source="UpdateTime" showTime />
        </SimpleForm>
    </Create>
);

 const BaseInfoCompanyPermitEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <DisabledInputEx  label="公司名称" source="CompanyName" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" />
            <TextInputEx label="经营区域"  source="OperationArea" />
            <TextInputEx label="公司名称"  source="OwnerName" />
            <TextInputEx label="发证机构名称"  source="Organization" />
            <DateInput label="有效期起" source="StartDate" />
            <DateInput label="有效期止" source="StopDate" />
            <DateInput label="初次发证日期" source="CertifyDate" />
            <DisabledInputEx label="状态"  source="State" />
            <DateField label="数据更新时间" source="UpdateTime" showTime />
        </SimpleForm>
    </EditPage>
);


export const BaseInfoCompanyPermitList = props => (
    <ShowPageOne Create={BaseInfoCompanyPermitCreate} Edit={BaseInfoCompanyPermitEdit} {...props}/>
);
