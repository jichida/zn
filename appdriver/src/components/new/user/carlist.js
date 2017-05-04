/*
    个人中心－我的车辆
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/usercarlist.css';
import NavBar from '../tools/nav.js';
const { 
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription
    } = WeUI;

class Page extends Component {

    render() {
        let titleRightNav = [
            {
                icon : '',
                text : '新增车辆',
                type : 'push',//push, action, 
                url : '/'
            },
        ];
        return (
            <div className="usercarlistPage AppPage">
                <NavBar back={true} title="我的车辆" rightnav={titleRightNav} />
                <div className="list">

                    <Panel>

                        <PanelBody>

                            <MediaBox type="appmsg" href="javascript:void(0);">
                                <MediaBoxHeader>
                                    <img src="newimg/18.png" />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>现代·1109</MediaBoxTitle>
                                    <MediaBoxDescription>
                                        <span className="tag">苏A12345</span>
                                        <span className="current">当前车辆</span>
                                    </MediaBoxDescription>
                                </MediaBoxBody>
                            </MediaBox>

                            <MediaBox type="appmsg" href="javascript:void(0);">
                                <MediaBoxHeader>
                                    <img src="newimg/18.png" />
                                </MediaBoxHeader>
                                <MediaBoxBody>
                                    <MediaBoxTitle>现代·1109</MediaBoxTitle>
                                    <MediaBoxDescription>
                                        <span className="tag">苏A12345</span>
                                        <span className="current">当前车辆</span>
                                    </MediaBoxDescription>
                                </MediaBoxBody>
                            </MediaBox>
                            
                        </PanelBody>


                    </Panel>

                </div>
            </div>
        )
    }
}
export default Page;