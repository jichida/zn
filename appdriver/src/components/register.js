import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/newcss/register.css';
const { 
    FormCell,
    Checkbox,
    CellHeader,
    CellBody,
    Form,
    Agreement,
    Input,
    Label,
    CellFooter,
    Button
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="registerPage AppPage">
				<Form>
	                <FormCell>
	                    <CellHeader>
	                        <Label>手机号</Label>
	                    </CellHeader>
	                    <CellBody>
	                        <Input type="tel" placeholder="请输入您的手机号"/>
	                    </CellBody>
	                </FormCell>
	                <FormCell vcode>
	                    <CellHeader>
	                        <Label>验证码</Label>
	                    </CellHeader>
	                    <CellBody>
	                        <Input type="tel" placeholder="请输入验证码"/>
	                    </CellBody>
	                    <CellFooter>
	                        <Button type="vcode">获取</Button>
	                    </CellFooter>
	                </FormCell>
	                <FormCell>
	                    <CellHeader>
	                        <Label>密码</Label>
	                    </CellHeader>
	                    <CellBody>
	                        <Input type="password" placeholder="请输入密码"/>
	                    </CellBody>
	                </FormCell>
	            </Form>
	            <Agreement>
        			&nbsp;&nbsp; <a href="javascript:;">我已经阅读并同意中南出行协议</a>
        		</Agreement>

        		<div className="submitBtn">
					<botton className="btn Primary">下一步</botton>
                    <a className="blue">已有账号，去登录</a>
				</div>
    		</div>
    	)
    }
}

export default Page;