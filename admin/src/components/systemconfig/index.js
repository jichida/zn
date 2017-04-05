import React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
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

import {TextFieldSZ,TextInputSZ} from '../controls/tags.js';
import ShowPageOne from '../controls/singlelistpage.js';
import ShowPage from '../controls/ShowPage.js';
import EditPage from '../controls/EditPage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextFieldSZ label="对司机的评价" source="commenttagsfordriver" />
               <TextFieldSZ label="对乘客的评价" source="commenttagsforrider" />
               <TextField  label="代驾预付款" source="paydaijia.pricevalue" />
               <TextField  label="旅游大巴预付款" source="paytourbus.pricevalue" />
               <RichTextField label="出租车价格显示" source="pricestring.出租车" stripTags={false}/>
               <RichTextField label="快车价格显示" source="pricestring.快车" stripTags={false}/>
               <RichTextField label="代驾价格显示" source="pricestring.代驾" stripTags={false}/>
           </SimpleShowLayout>
       </ShowPage>
);

export {SystemconfigShow};
export const SystemconfigList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={SystemconfigShow} hasEdit={true}>
    </ShowPageOne>
);


export const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <SimpleForm>
            <TextInputSZ label="对司机的评价" source="commenttagsfordriver" />
            <TextInputSZ label="对乘客的评价" source="commenttagsforrider" />
            <TextInput  label="代驾预付款" source="paydaijia.pricevalue" />
            <TextInput  label="旅游大巴预付款" source="paytourbus.pricevalue" />
            <RichTextEditorInput label="出租车价格显示" source="pricestring.出租车" addLabel={false}/>
            <RichTextEditorInput label="快车价格显示" source="pricestring.快车" addLabel={false}/>
            <RichTextEditorInput label="代驾价格显示" source="pricestring.代驾" addLabel={false}/>
        </SimpleForm>
    </EditPage>
);
