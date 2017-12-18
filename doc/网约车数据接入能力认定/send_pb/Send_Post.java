package com.csht.pb;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Send_Post {

	private static final String SERVLET_POST = "POST";

	/**
	 * post发送结构体
	 * 
	 * @param buf
	 *            结构体数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String doPost(byte[] paramStr, String Url) {
		URL url;
		String code = "";
		OutputStream outputStream = null;
		try {
			url = new URL(Url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod(SERVLET_POST);
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			conn.setReadTimeout(15000);

			conn.setRequestProperty("Content-Type", "application/x-protobuf");
			// 建立输出流，并写入数据
			outputStream = conn.getOutputStream();
			outputStream.write(paramStr);

			// 获得响应状态
			code = conn.getResponseCode() + "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return code;
	}

	public static void main(String[] args) {
		OTIpc_Protobuf opv = new OTIpc_Protobuf();
		System.out.println(doPost(opv.Mosaic_Struct(), "http://172.16.11.22:8080/baseinfo/company?company=test"));
	}
}
