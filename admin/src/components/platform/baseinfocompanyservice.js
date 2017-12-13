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


const BaseInfoCompanyServiceTitle = ({ record }) => <span>服务机构信息</span>;


const BaseInfoCompanyServiceCreate = (props) => (
    <Create {...props} title={<BaseInfoCompanyServiceTitle />}>
        <SimpleForm>
            <DisabledInputEx label="公司名称" source="CompanyName" />
            <DisabledInputEx label="公司标识"  source="CompanyId" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="服务机构名称"  source="ServiceName" />
            <TextInputEx label="服务机构代码"  source="ServiceNo" />
            <TextInputEx label="服务机构地址"  source="DetailAddress" />
            <TextInputEx label="服务机构负责人姓名"  source="ResponsibleName" />
            <TextInputEx label="负责人联系电话"  source="ResponsiblePhone" />
            <TextInputEx label="服务机构管理人姓名"  source="ManagerName" />
            <TextInputEx label="管理人联系电话"  source="ManagerPhone" />
            <TextInputEx label="服务机构紧急联系电话"  source="ContactPhone" />
            <TextInputEx label="行政文书送达邮寄地址"  source="MailAddress" />
            <DateInput label="服务机构设立日期"  source="CreateDate" />
        </SimpleForm>
    </Create>
);


 const BaseInfoCompanyServiceEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyServiceTitle />}>
        <SimpleForm>
            <DisabledInputEx label="公司名称" source="CompanyName" />
            <DisabledInputEx label="公司标识"  source="CompanyId" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="服务机构名称"  source="ServiceName" />
            <TextInputEx label="服务机构代码"  source="ServiceNo" />
            <TextInputEx label="服务机构地址"  source="DetailAddress" />
            <TextInputEx label="服务机构负责人姓名"  source="ResponsibleName" />
            <TextInputEx label="负责人联系电话"  source="ResponsiblePhone" />
            <TextInputEx label="服务机构管理人姓名"  source="ManagerName" />
            <TextInputEx label="管理人联系电话"  source="ManagerPhone" />
            <TextInputEx label="服务机构紧急联系电话"  source="ContactPhone" />
            <TextInputEx label="行政文书送达邮寄地址"  source="MailAddress" />
            <DateInput label="服务机构设立日期"  source="CreateDate" />
        </SimpleForm>
    </EditPage>
);

export const BaseInfoCompanyServiceList = props => (
    <ShowPageOne Create={BaseInfoCompanyServiceCreate} Edit={BaseInfoCompanyServiceEdit} {...props}/>
);
