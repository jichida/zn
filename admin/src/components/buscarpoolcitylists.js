import React from 'react';

import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import CreateButton from './buttons/create-button.js';
import {TextFieldSZ,TextInputSZ} from './controls/tags.js';



const BuscarpoolclistcreateTitle = ({ record }) => {
   return <span>新建 城市-站点列表</span>;
};
const BuscarpoolclistlistCreate = (props) => (
       <Create {...props} title={<BuscarpoolclistcreateTitle />} >
           <SimpleForm>
               <TextInput label="城市名" source="cityname" />
               <TextInputSZ label="站点名" source="stations" />
           </SimpleForm>
       </Create>
);

const BuscarpoolclistlistTitle = ({ record }) => {
   return <span>编辑 城市-站点列表 {record ? `"${record.cityname}"` : ''}</span>;
};

const BuscarpoolclistlistEdit = (props) => {
      return (<Edit title={<BuscarpoolclistlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="城市名" source="cityname" />
              <TextInputSZ label="站点名" source="stations" />
          </SimpleForm>
      </Edit>);

};


const BuscarpoolclistlistShow = (props) => (
       <Show title={<BuscarpoolclistlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="城市名" source="cityname" />
               <TextFieldSZ label="站点名" source="stations"  addLabel={true}/>
           </SimpleShowLayout>
       </Show>
);



const BuscarpoolclistlistList = (props) => (//
     <List title="城市所有站点列表" {...props} >
        <Datagrid>
        <TextField label="城市名" source="cityname" />
        <TextFieldSZ label="站点名" source="stations"/>
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BuscarpoolclistlistList,BuscarpoolclistlistCreate,BuscarpoolclistlistEdit,BuscarpoolclistlistShow};
