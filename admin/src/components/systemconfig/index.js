import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
    Edit as EditPage,
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
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';

import {TextFieldSZ,TextInputSZ} from '../controls/tags.js';
import ShowPageOne from '../controls/singlelistpage.js';



const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextFieldSZ label="对司机的评价" source="commenttagsfordriver"  addLabel={true}/>
               <TextFieldSZ label="对乘客的评价" source="commenttagsforrider"  addLabel={true}/>
               <TextField  label="代驾预付款" source="paydaijia" />
               <TextField  label="旅游大巴预付款(百分比)" source="paytourbus" />
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

const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
export const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
           <SimpleForm>
             <TextInputSZ label="对司机的评价" source="commenttagsfordriver"  addLabel={true}/>
             <TextInputSZ label="对乘客的评价" source="commenttagsforrider"  addLabel={true}/>
             <NumberInput  label="代驾预付款" source="paydaijia" />
             <NumberInput  label="旅游大巴预付款(百分比)" source="paytourbus" />
             <RichTextEditorInput label="出租车价格显示" source="pricestring.出租车" addLabel={true}/>
             <RichTextEditorInput label="快车价格显示" source="pricestring.快车" addLabel={true}/>
             <RichTextEditorInput label="代驾价格显示" source="pricestring.代驾" addLabel={true}/>
           </SimpleForm>
       </Create>
);

export const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <SimpleForm>
            <TextInputSZ label="对司机的评价" source="commenttagsfordriver" addLabel={true}/>
            <TextInputSZ label="对乘客的评价" source="commenttagsforrider" addLabel={true}/>
            <NumberInput  label="代驾预付款" source="paydaijia" />
            <NumberInput  label="旅游大巴预付款(百分比)" source="paytourbus" />
            <RichTextEditorInput label="出租车价格显示" source="pricestring.出租车" addLabel={true}/>
            <RichTextEditorInput label="快车价格显示" source="pricestring.快车" addLabel={true}/>
            <RichTextEditorInput label="代驾价格显示" source="pricestring.代驾" addLabel={true}/>
        </SimpleForm>
    </EditPage>
);
