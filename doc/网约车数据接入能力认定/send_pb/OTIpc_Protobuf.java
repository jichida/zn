package com.csht.pb;

import com.csht.pb.OTIpcDef.IpcType;
import com.csht.pb.OTIpcDef.OTIpc;

public class OTIpc_Protobuf {

	public static void main(String[] args) {
		OTIpc_Protobuf opv = new OTIpc_Protobuf();
		opv.Mosaic_Struct();
	}

	/**
	 * @param args
	 */
	public byte[] Mosaic_Struct() {
		// BaseInfoCompany结构--网约车平台公司基础信息 0x1001
		OTIpcDef.BaseInfoCompany.Builder builder_BaseInfoCompany = null;

		// OTIpc结构
		OTIpcDef.OTIpc.Builder builder_OTIpc = OTIpcDef.OTIpc.newBuilder();
		builder_OTIpc.setCompanyId("test");

		// 消息来源标识
		builder_OTIpc.setSource("0");
		builder_OTIpc.setIPCType(IpcType.baseInfoCompany);
		builder_OTIpc.addBaseInfoCompany(baseInfoCompany(builder_BaseInfoCompany));
		OTIpc otipc = builder_OTIpc.build();
		byte[] buf = otipc.toByteArray();
		return buf;
	}

	public OTIpcDef.BaseInfoCompany.Builder baseInfoCompany(OTIpcDef.BaseInfoCompany.Builder builder_BaseInfoCompany) {
		builder_BaseInfoCompany = OTIpcDef.BaseInfoCompany.newBuilder();
		builder_BaseInfoCompany.setCompanyId("test");
		builder_BaseInfoCompany.setCompanyName("测试");
		builder_BaseInfoCompany.setIdentifier("91120118328676979R");
		builder_BaseInfoCompany.setContactPhone("010-12345678");
		builder_BaseInfoCompany.setAddress(110000);
		builder_BaseInfoCompany.setBusinessScope("10000");
		builder_BaseInfoCompany.setContactAddress("北京市东城区长安路1牌1号");
		builder_BaseInfoCompany.setEconomicType("其他有限责任公司");
		builder_BaseInfoCompany.setRegCapital("4377.4054万元");
		builder_BaseInfoCompany.setLegalName("张三");
		builder_BaseInfoCompany.setLegalID("110108196801304922");
		builder_BaseInfoCompany.setLegalPhone("010-12345678");
		builder_BaseInfoCompany.setLegalPhoto("");
		builder_BaseInfoCompany.setIdentifierPhoto("");
		builder_BaseInfoCompany.setState(0);
		builder_BaseInfoCompany.setFlag(1);
		builder_BaseInfoCompany.setUpdateTime(20161101151703l);
		return builder_BaseInfoCompany;
	}

}
