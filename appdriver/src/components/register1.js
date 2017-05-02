import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/newcss/register.css';
const { 
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="registerPage register1Page AppPage">
				<Cells>
		            <Cell href="javascript:;" access>
		                <CellHeader>
		                    <img src="newimg/1.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为快车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		            <Cell href="javascript:;" access>
		                <CellHeader>
		                    <img src="newimg/2.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为出租车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		            <Cell href="javascript:;" access>
		                <CellHeader>
		                    <img src="newimg/3.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为代驾司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		        </Cells>
    		</div>
    	)
    }
}

export default Page;