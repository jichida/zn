package com.cttic.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class Test {
	
	public static void main(String[] args) {
//      单条发送
		String url = "";
		JSONObject obj = new JSONObject();
		Map<String, Object> baseInfoCompany = new HashMap<String, Object>();
		obj.put("Source", "1");
		obj.put("CompanyId", "test");
		obj.put("IPCType", "baseInfoCompany");
		baseInfoCompany.put("Flag", 1);
		baseInfoCompany.put("ContactAddress", "北京市朝阳区xxxxxxxxxxx");
		baseInfoCompany.put("CompanyId", "test");
		baseInfoCompany.put("LegalPhone", "xxxxxxxxxx");
		baseInfoCompany.put("UpdateTime", 20161101151703l);
		baseInfoCompany.put("ContactPhone", "010-xxxxxxx");
		baseInfoCompany.put("RegCapital", "xxxx.xxxx万元");
		baseInfoCompany.put("CompanyName", "test");
		baseInfoCompany.put("EconomicType", "其他有限责任公司");
		baseInfoCompany.put("LegalID", "xxxxxxxxxxx");
		baseInfoCompany.put("LegalName", "张三");
		baseInfoCompany.put("LegalPhoto", "");
		baseInfoCompany.put("State", 0);
		baseInfoCompany.put("Address", 110105);
		baseInfoCompany.put("IdentifierPhoto", "");
		baseInfoCompany.put("Identifier", "xxxxxxxxx");
		baseInfoCompany.put("BusinessScope", "10000");
		obj.put("baseInfoCompany", baseInfoCompany);
		System.out.println(sendPost_JSON(url, obj));
//		bitch();
	
	}
	//批量发送
    public static void bitch(){
    	String url = "";
    	JSONObject obj = new JSONObject();
    	obj.put("CompanyId", "test");
    	obj.put("Source", "1");
    	obj.put("IPCType", "positionDriver");
    	JSONArray  array = new JSONArray();
    	for(int i = 0 ; i < 3 ; i++){
    		JSONObject positionDriver = new JSONObject();
    		positionDriver.put("CompanyId", "test");
    		positionDriver.put("LicenseId", "123456");
    		positionDriver.put("DriverRegionCode", 110000);
    		positionDriver.put("VehicleNo","京A12345");
    		positionDriver.put("OrderId","TC201612282037");
    		positionDriver.put("PlateColor","1");
    		positionDriver.put("PositionTime",1478566122);
    		positionDriver.put("Longitude",0);
    		positionDriver.put("Latitude",0);
    	    array.add(positionDriver);
    	}
    
    	obj.put("positionDriver", array);
    	System.out.println(	sendPost_JSON(url,obj));
    }
	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static int sendPost_JSON(String url, JSONObject obj) {
        int  result = 0 ;
		BufferedReader in = null;
		OutputStream out = null;
		HttpURLConnection conn = null;
		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			conn = (HttpURLConnection) realUrl.openConnection();
			// 设置允许输出
			conn.setDoOutput(true);
			conn.setDoInput(true);
			
			conn.setRequestMethod("POST");
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("Content-Type", "application/json");
			
			conn.connect();
			// 获取URLConnection对象对应的输出流
			out = conn.getOutputStream();
			// 发送请求参数
			out.write((obj.toString()).getBytes());
			// flush输出流的缓冲
			out.flush();
			result = conn.getResponseCode();
		} catch (Exception e) {
			System.out.println("发送 POST 请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}

			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

}
