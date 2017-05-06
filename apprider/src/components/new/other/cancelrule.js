/*
	取消规则
*/
import React, { Component } from 'react';
import NavBar from '../tools/nav.js';
import '../../../../public/newcss/cancelrule.css';

class Page extends Component {

    render() {
        return (
            <div className="cancelrulePage AppPage">
                <NavBar back={true} title="取消规则" />
                <div className="content">
                	<div className="panel">
                		<div className="cont">鉴于：为保护代驾服务关系中相关方的合法权益</div>
                	</div>
					<div className="panel">
						<div className="tit">为何爽约</div>
                		<div className="cont">爽约是指用户(及乘客)发布的信息经服务放...</div>
                	</div>
                	<div className="panel">
						<div className="tit">取消责任的判定</div>
						<div className="li">
                			<div className="cont">爽约是指用户爽约是指用户爽约是指用户爽约是指用户爽约是指用户爽约是指用户(及乘客)发布的信息经服务放...</div>
                		</div>
                	</div>
                </div>
            </div>
        )
    }
}
export default Page;