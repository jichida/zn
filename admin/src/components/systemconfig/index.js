import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
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
    SelectArrayInput,
    ChipField,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm,
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';


import ShowPageOne from '../controls/singlelistpage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <ChipField label="对司机的评价" source="commenttagsfordriver"  addLabel={true}/>
               <ChipField label="对乘客的评价" source="commenttagsforrider"  addLabel={true}/>
               <TextField label="最大显示评价数" source="maxshowtags" />
               <ChipField label="拼车城市列表" source="pinchecitylist" addLabel={true}/>
               <ChipField label="热门城市列表" source="hotcity" addLabel={true}/>
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
       <TabbedForm>
           <FormTab label="resources.systemconfig.tabs.rider">
           <SelectArrayInput label="对司机的评价" source="commenttagsfordriver" options={{ fullWidth: true }}/>
           <NumberInput label="最大显示评价数" source="maxshowtags"/>
           <SelectArrayInput label="拼车城市列表" source="pinchecitylist"  options={{ fullWidth: true }}/>
           <SelectArrayInput label="热门城市列表" source="hotcity"  options={{ fullWidth: true }}/>
           </FormTab>
           <FormTab label="resources.systemconfig.tabs.driver">
           <SelectArrayInput label="对乘客的评价" source="commenttagsforrider"  options={{ fullWidth: true }}/>
           </FormTab>
       </TabbedForm>
       </Create>
);

export const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <TabbedForm>
            <FormTab label="resources.systemconfig.tabs.rider">
            <SelectArrayInput label="对司机的评价" source="commenttagsfordriver" options={{ fullWidth: true }}/>
            <NumberInput label="最大显示评价数" source="maxshowtags"/>
            <SelectArrayInput label="拼车城市列表" source="pinchecitylist"  options={{ fullWidth: true }}/>
            <SelectArrayInput label="热门城市列表" source="hotcity"  options={{ fullWidth: true }}/>
            </FormTab>
            <FormTab label="resources.systemconfig.tabs.driver">
            <SelectArrayInput label="对乘客的评价" source="commenttagsforrider"  options={{ fullWidth: true }}/>
            </FormTab>
        </TabbedForm>
    </EditPage>
);
