/*
    审核
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/examine.css';
import NavBar from './tools/nav.js';

class Page extends Component {

    render() {
        return (
            <div className="examinePage AppPage">
                <NavBar back={true} title="审核" />

                <div className="list">

                    <div className="success li">
                        <img src="newimg/13.png" />
                        <div className="tit">
                            你好，<span className="color_warning">审核已通过</span>
                        </div>
                        <div className="desc">
                            你可以在此平台上接单了
                        </div>
                        <div className="btn Warning">
                            去接单
                        </div>
                    </div>

                    <div className="false li">
                        <img src="newimg/14.png" />
                        <div className="tit">
                            你好，<span className="color_warning">审核没有通过</span>
                        </div>
                        <div className="desc">
                            如有疑问电致：400-1234－567
                        </div>
                        <div className="btn Warning">
                            联系客服
                        </div>
                    </div>

                    <div className="warting li">
                        <img src="newimg/15.png" />
                        <div className="tit">
                            你好，正在加紧<span className="color_warning">审核中</span>
                        </div>
                        <div className="desc">
                            审核结果会以短信形式通知你
                        </div>
                    </div>

                    <div className="updata li">
                        <img src="newimg/16.png" />
                        <div className="tit">
                            注册资料已提交，<span className="color_warning">待审核</span>
                        </div>
                        <div className="desc">
                            <span>审核将于5个工作日内完成</span>
                            <span className="color_warning">审核结果会以短信的形式通知你</span>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}
export default Page;