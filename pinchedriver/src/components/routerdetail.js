/**
 * Created by jiaowenhui on 2017/7/21.
 */
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import { connect } from 'react-redux';
import moment from "moment";
import NavBar from './tools/nav.js';
import InfinitePage from './controls/listview';
import {callthen} from '../sagas/sagacallback';
import '../newcss/index.css';

const { Cells, Cell, CellBody, CellFooter,CellHeader, CellsTitle } = WeUI;
let usecacherouter = false;

export class Page extends Component {

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    };

    componentDidMount(){
        usecacherouter = false;
    }

    render() {
        return (
            <div className="pinchePage AppPage">
                <NavBar back={true} title="路线详情" rightnav={[
                    {icon : '../img/map.png',
                    text : '路线地图',
                    type : 'push',
                    url : '/routermap'}
                ]}/>
                <div className="pinche">
                    <div className="time">2017-09-09 12:30</div>
                    <div className="city">
                        <span className="start">南京(南站)</span>
                        <span className="line"></span>
                        <span className="end">天长</span>
                    </div>
                   
                    <div className="time2">
                        <span>10人成团</span>
                        <span>5人参与</span>
                    </div>
                </div>

                <CellsTitle>乘客列表</CellsTitle>
                <Cells>
                    <Cell href="tel:19000000000" access>
                        <CellBody>
                            张飞
                        </CellBody>
                        <CellFooter>
                            19000000000
                        </CellFooter>
                    </Cell>
                    <Cell href="tel:19000000000" access>
                        <CellBody>
                            赵云
                        </CellBody>
                        <CellFooter>
                            19000000000
                        </CellFooter>
                    </Cell>
                </Cells>
            </div>
        )
    }
}

Page = connect()(Page);
export default Page;
