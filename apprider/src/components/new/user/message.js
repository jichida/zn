/*消息中心*/
import React, { Component } from 'react';
import '../../../../public/newcss/message.css';
import NavBar from '../tools/nav.js';

class Page extends Component {

    render() {
        return (
            <div className="messagePage AppPage">
                <NavBar back={true} title="消息" />
                <div className="list">
                    <div className="li">
                    	<div className="time">01月16日 13:56</div>
                    	<div className="cont">
                    		<div className="tit">新用户首单半价奖励</div>
                    		<div className="text">这里时内容部分</div>
                    	</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Page;