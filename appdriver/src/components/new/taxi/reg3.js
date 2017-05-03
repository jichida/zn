/*
    注册司机－车辆信息
*/
import React, { Component } from 'react';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
const { 
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Label,
    Input,
    Select,
    CellsTitle
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="taxiPage AppPage">
                <NavBar back={true} title="上传照片" />
                <div className="list updataimg">

                    <div className="li">
                        <div className="tit">服务资格证</div>
                        <div className="desc">证件有效期内，需证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <img src="newimg/12.png" />
                            <div className="lnk">
                                点击上传
                            </div>
                        </div>
                    </div>

                    <div className="li">
                        <div className="tit">监督卡</div>
                        <div className="desc">证件有效期内，需证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <img src="newimg/12.png" />
                            <div className="lnk">
                                点击上传
                            </div>
                        </div>
                    </div>

                    <div className="li">
                        <div className="tit">驾驶证</div>
                        <Form>
                            <FormCell>
                                <CellHeader>
                                    <Label>驾驶证号</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" placeholder="请输入驾驶证号"/>
                                </CellBody>
                            </FormCell>
                        </Form>
                        <div className="desc">有效期内，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <img src="newimg/12.png" />
                            <div className="lnk">
                                点击上传
                            </div>
                        </div>
                    </div>

                    <div className="li">
                        <div className="tit">行驶证</div>
                        <div className="desc">出租客运，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <img src="newimg/12.png" />
                            <div className="lnk">
                                点击上传
                            </div>
                        </div>
                    </div>

                     <div className="li">
                        <div className="tit">人车合影</div>
                        <div className="desc">人车合影正面照，能看清人、车牌、顶灯。</div>
                        <div className="imgbox">
                            <img src="newimg/12.png" />
                            <div className="lnk">
                                点击上传
                            </div>
                        </div>
                    </div>

                </div>

                <div className="submitBtn">
                    <botton className="btn Primary">完成</botton>
                </div>
            </div>
        )
    }
}
export default Page;