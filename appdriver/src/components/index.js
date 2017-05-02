import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/newcss/index.css';
import NavBar from './new/tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
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
    		<div className="indexPage AppPage">
    			<NavBar back={true} title="中南出行" />
				<div className="indexHead">
					<Cells>
			            <Cell access>
			                <CellHeader>
			                    <img src="newimg/1.png" />
			                </CellHeader>
			                <CellBody>
			                    <div className="tit">
			                    	<span className="name">刘询</span>
			                    	<span className="type">代驾</span>
			                    </div>
			                    <div className="starcontent">
				                    <StarRatingComponent 
					                    name="star" 
					                    editing={false}
					                    starCount={5}
					                    value={4.5}
					                    emptyStarColor="#EEEEEE"
					                />
				                </div>
			                    <div className="con">当前车辆: 苏A123456</div>
			                </CellBody>
			                <CellFooter />
			            </Cell>
			        </Cells>
				</div>
				<div className="list">
					<Cells>
			            <Cell href="javascript:;" access>
			                <CellHeader>
			                    <img src="newimg/5.png" />
			                </CellHeader>
			                <CellBody>
			                   	我的行程
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell href="javascript:;" access>
			                <CellHeader>
			                    <img src="newimg/6.png" />
			                </CellHeader>
			                <CellBody>
			                   	我的钱包
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell href="javascript:;" access>
			                <CellHeader>
			                    <img src="newimg/7.png" />
			                </CellHeader>
			                <CellBody>
			                   	我的车辆
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell href="javascript:;" access>
			                <CellHeader>
			                    <img src="newimg/8.png" />
			                </CellHeader>
			                <CellBody>
			                   	消息中心
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell href="javascript:;" access>
			                <CellHeader>
			                    <img src="newimg/9.png" />
			                </CellHeader>
			                <CellBody>
			                   	联系客服
			                </CellBody>
			                <CellFooter />
			            </Cell>
			        </Cells>
				</div>
				<div className="pointLnk">
					<a>
						<img src="newimg/10.png" />
						<span>出车</span>
					</a>
				</div>
    		</div>
    	)
    }
}

export default Page;