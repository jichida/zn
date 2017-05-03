import React from 'react';

import {
  NumberInput,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  List,
  SimpleShowLayout,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
  TabbedForm,
  FormTab,
  Filter,
  SelectInput,
  ImageField,
  ReferenceField
 } from 'admin-on-rest/lib/mui';

import ApproveButton from './btn';

const UserdriverlistTitle = ({ record }) => {
   return <span>显示 司机</span>;
};

export const UserdriverFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserdriverTitle = ({ record }) => {
   return <span>司机</span>;
};

const UserdriverlistEdit = (props) => {
      return (<Edit title={<UserdriverTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.userdriver.tabs.basicinfo">
              <TextField label="Id" source="id" />
              <TextField label="手机号"  source="username" />
              <SelectInput  label="注册类型"  source="registertype" choices={[
                  { id: '出租车', name: '出租车' },
                  { id: '快车', name: '快车' },
                  { id: '代驾', name: '代驾' },
              ]} />
              <DateField label="注册时间" source="created_at"  showTime/>
              <DateField label="上次登录时间" source="updated_at"  showTime/>
              <ReferenceField label="默认车辆(至少应有一辆,否则不要审批通过)" source="defaultmycar" reference="mycar" allowEmpty addLabel={true}>
                <TextField source="name" />
              </ReferenceField>
              <ReferenceField label="平台关联司机" source="Platform_baseInfoDriverId" reference="baseinfodriver" allowEmpty addLabel={true}>
                <TextField source="DriverName" />
              </ReferenceField>
              <TextField label="余额" source="balance" />
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审批状态"  source="approvalstatus" choices={[
                  { id: '未审批', name: '未审批' },
                  { id: '已审批', name: '审批通过' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformdriverinfo">
              <TextInput label="姓名" source="Platform_baseInfoDriver.DriverName" />
              <TextInput label="手机号" source="Platform_baseInfoDriver.DriverPhone" />
              <TextInput label="性别" source="Platform_baseInfoDriver.DriverGender" />
              <DateInput label="生日" source="Platform_baseInfoDriver.DriverBirthday" />
              <TextInput label="国籍" source="Platform_baseInfoDriver.DriverNationality" />
              <TextInput label="民族" source="Platform_baseInfoDriver.DriverNation" />
              <SelectInput  label="婚姻状况"  source="Platform_baseInfoDriver.DriverMaritalStatus" choices={[
                  { id: '未婚', name: '未婚' },
                  { id: '已婚', name: '已婚' },
                  { id: '离异', name: '离异' },
              ]} />
              <TextInput label="外语能力" source="Platform_baseInfoDriver.DriverLanguageLevel" />
              <TextInput label="学历" source="Platform_baseInfoDriver.DriverEducation" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformhukou">
              <TextInput label="户口登记机关名称" source="Platform_baseInfoDriver.DriverCensus" />
              <TextInput label="户口住址或长住地址" source="Platform_baseInfoDriver.DriverAddress" />
              <TextInput label="驾驶员通信地址" source="Platform_baseInfoDriver.ContactAddress" />
              <ImageField  label="驾驶员照片"  source="Platform_baseInfoDriver.PhotoldURL" addLabel={true}/>
              <TextInput label="机动车驾驶证号" source="Platform_baseInfoDriver.Licenseld" />
              <ImageField  label="机动车驾驶证扫描件" source="Platform_baseInfoDriver.LicensePhotoldURL" addLabel={true}/>
              <TextInput label="准驾车型" source="Platform_baseInfoDriver.DriverType" />
              <DateInput label="初次领取驾驶证日期" source="Platform_baseInfoDriver.GetDriverLicenseDate" />
              <DateInput label="驾驶证有效期限起" source="Platform_baseInfoDriver.DriverLicenseOn" />
              <DateInput label="驾驶证有效期限止" source="Platform_baseInfoDriver.DriverLicenseOff" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformtaxi">
              <BooleanInput label="是否出租汽车驾驶员" source="Platform_baseInfoDriver.TaxiDriver" defaultValue={false} />
              <TextInput label="网络预约出租汽车驾驶员资格证号" source="Platform_baseInfoDriver.CertificateN0" />
              <TextInput label="网络预约出租汽车驾驶员证发证机构" source="Platform_baseInfoDriver.NetworkCarIssueOrgamzatlOn" />
              <DateInput label="资格证发证日期" source="Platform_baseInfoDriver.NetworkCarIssueDate" />
              <DateInput label="初次领取资格证日期" source="Platform_baseInfoDriver.GetNetworkCarProofDate" />
              <DateInput label="资格证有效起始日期" source="Platform_baseInfoDriver.NetworkCarProofOn" />
              <DateInput label="资格证有效截止日期" source="Platform_baseInfoDriver.NetworkCarProofOff" />
              <DateInput label="报备日期" source="Platform_baseInfoDriver.RegisterDate" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformcontract">
              <BooleanInput label="是否专职驾驶员" source="Platform_baseInfoDriver.FullTimeDriver" defaultValue={true} />
              <BooleanInput label="是否在驾驶员黑名单内" source="Platform_baseInfoDriver.InDriverBlacklist" defaultValue={false} />
              <SelectInput  label="服务类型"  source="Platform_baseInfoDriver.CommercialType" choices={[
                  { id: 1, name: '网络预约出租汽车' },
                  { id: 2, name: '巡游出租汽车' },
                  { id: 3, name: '私人小客车合乘' },
              ]} />
              <TextInput label="签署公司全称" source="Platform_baseInfoDriver.ContractCompany" />
              <DateInput label="合同或协议)有效期起" source="Platform_baseInfoDriver.ContractOn" />
              <DateInput label="合同(或协议)有效期止 " source="Platform_baseInfoDriver.ContractOff" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformemergencycontact">
              <TextInput label="紧急情况联系人" source="Platform_baseInfoDriver.EmergencyContact" />
              <TextInput label="紧急情况联系人电话手机号" source="Platform_baseInfoDriver.EmergencyContactPhone" />
              <TextInput label="紧急情况联系人通信地址" source="Platform_baseInfoDriver.EmergencyContactAddress" />
              </FormTab>
        </TabbedForm>
      </Edit>);

};




const UserdriverlistList = (props) => (//
     <List title="司机列表" {...props} Filter={UserdriverFilter}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="审批状态"  source="approvalstatus" />
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserdriverlistList,UserdriverlistEdit};
