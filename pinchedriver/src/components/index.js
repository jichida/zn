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
import { getmypincheroute_request, getmypincheroute_result } from '../actions';
import {callthen} from '../sagas/sagacallback';
import '../newcss/index.css';

const { Cells, Cell, CellBody, CellFooter } = WeUI;
let usecacherouter = false;

export class Page extends Component {

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    };

    componentDidMount(){
        usecacherouter = false;
    }

    updateContent = (routerinfo)=> {
        return  (
            <div
                className="licontent"
                onClick={()=>{this.pagePush(`routerdetail/${routerinfo._id}`)}}
                >
                
                <div className="time">2017-02-09</div>
                <div className="city">
                    南京——天长
                    <p className="text-warning margin-top-0">
                        <span>20人成团</span>
                        <span>载客20人</span>
                        <span>10人已参与</span>
                    </p>
                </div>
                    
            </div>
        );
    }

    render() {
        return (
            <div className="indexPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                    <div>
                        <InfinitePage
                            usecache={usecacherouter}
                            listtypeid='routerinfo'
                            pagenumber={30}
                            updateContent={this.updateContent}
                            queryfun={(payload)=>{
                                return callthen(getmypincheroute_request,getmypincheroute_result,payload);
                            }}
                            listheight={window.innerHeight-300}
                            query={{}}
                            sort={{}}
                        />
                        <div className="listcontent"
                            onClick={()=>{this.pagePush(`routerdetail/1`)}}
                            >
                            <div className="licontent">
                                <div className="time">02-09<br/>12:30</div>
                                <div className="city">
                                    南京——天长
                                    <p className="text-warning margin-top-0">
                                        <span>20人成团</span>
                                        <span>载客20人</span>
                                        <span>10人已参与</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="listcontent">
                            <div className="licontent">
                                <div className="time">02-09<br/>12:30</div>
                                <div className="city">
                                    南京——天长
                                    <p className="text-warning margin-top-0">
                                        <span>20人成团</span>
                                        <span>载客20人</span>
                                        <span>10人已参与</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                </div>
            </div>
        )
    }
}

Page = connect()(Page);
export default Page;
