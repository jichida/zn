/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import OrderItem from './myordersitem.js';
import {ui_setmyorderstabheader,getmytriporders_request} from '../../actions';

import {
    View
} from 'amazeui-touch';

export class Page extends React.Component {
    constructor(props) {
        super(props);
     }
    componentWillMount () {
        this.onClickSelTabOrder('all');
    }
    componentWillUnmount () {
    }
    onClickSelTabOrder(name){
        console.log("onClickSelTabOrder:" + name);
        this.props.dispatch(ui_setmyorderstabheader(name));
        let queryobj = {};
        if(name === 'all'){
        }
        else if(name === 'paid'){
            queryobj = {paystatus:'已支付'};
         }
        else if(name === 'notpaid'){
            queryobj ={paystatus:'未支付'};
         }
        this.props.dispatch(getmytriporders_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: 0,
                limit: 10,
            }
        }));
    }
    onClickSelCurOrder(orderinfo){
        this.props.history.push(`/orderdetail/${orderinfo._id}`);
    }
    onClickBack(){
        this.props.history.goBack();
    }

    isRowLoaded = ({ index })=> {
        return (this.props.mytriporderlist.length > index);
    }

    loadMoreRows= ({ startIndex, stopIndex })=> {
        console.log(`loadMoreRows====>${startIndex},${stopIndex}`)
        return new Promise((resolve) => {
          let name = this.props.tabheader;
          let queryobj = {};
          if(name === 'all'){
          }
          else if(name === 'paid'){
              queryobj = {paystatus:'已支付'};
          }
          else if(name === 'notpaid'){
              queryobj ={paystatus:'未支付'};
          }
          this.props.dispatch(getmytriporders_request({
              query:queryobj,
              options:{
                  sort:{created_at:-1},
                  offset: startIndex,
                  limit: (stopIndex-startIndex),
              }
          }));
          resolve();
        }).then((result)=> {

        });
    }

    rowRenderer= ({ key, index, style})=> {
      if (this.isRowLoaded({index})) {
          let tripid = this.props.mytriporderlist[index];
          return (<OrderItem orderinfo={this.props.triporders[tripid]}  key={key}
                       onClickSelCurOrder={this.onClickSelCurOrder.bind(this)} />);
       }
       return (<div key={key}>loading...</div>);
    }

    render() {
        let tabheaders = [
            {
                name:'all',
                title:'全部'
            },
            {
                name:'paid',
                title:'已支付'
            },
            {
                name:'notpaid',
                title:'未支付'
            },
        ];
        let tabstatus = {};
        let headerocs = [];
        tabheaders.forEach((headerobj)=>{
            tabstatus[headerobj.name] = headerobj.title;
            if(headerobj.name === this.props.tabheader){
                headerocs.push(<li key={headerobj.name} className="hover">{headerobj.title}</li>);
            }
            else{
                headerocs.push(<li key={headerobj.name} onClick={this.onClickSelTabOrder.bind(this,headerobj.name)}>{headerobj.title}</li>);
            }

        });
        console.log(`window.innerHeight===>${window.innerHeight}`);
        return (
            <View>
                <header className="navbar">
                    <h2 className="navbar-title navbar-center"><font><font>我的订单</font></font></h2>
                    <div onClick={this.onClickBack.bind(this)} className="navbar-nav navbar-left"><a className="navbar-nav-item"><span className="icon icon-left-nav navbar-icon navbar-icon-sibling-of-title">返回</span></a></div>
                </header>

                <div className="tab">
                    <ul className="list  margin-top-0">
                        {headerocs}
                    </ul>
                </div>

                <div className="messageList" style={{height:(window.innerHeight-46)+"px"}}>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={this.props.remoteRowCount}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            height={151*this.props.mytriporderlist.length}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowCount={this.props.remoteRowCount}
                            rowHeight={151}
                            rowRenderer={this.rowRenderer}
                            width={window.innerWidth}
                        />
                    )}
                </InfiniteLoader>
                </div>
            </View>
        );
    }
}

const mapStateToProps =  ({myorders}) =>{
    return {...myorders};
};

export default connect(
    mapStateToProps,
)(Page);
