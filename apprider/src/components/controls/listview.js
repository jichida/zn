import React from 'react';
import ListView from 'rmc-list-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import './listview.css';

class Page extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = [];
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
    };

    this.onAjax = this.onAjax.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillMount() {
    this.onAjax();
  }

  onRefresh() {
    console.log('onRefresh');
    this.setState({ refreshing: true });
    this.onAjax();
  }

  onAjax(){
    let querypage = 1;
    let that = this;
    this.props.dispatch(this.props.queryfun({
        query: this.props.query,
        options: {
            sort: this.props.sort,
            page: querypage,
            limit: this.props.pagenumber,
        }
    })).then(({result})=> {
      that.initData = [];
      if(!!result){
        _.map(result.docs,(item)=>{
          that.initData.push(item);
        });
      }
      let dateSource =  that.state.dataSource.cloneWithRows([...that.initData]);
      that.setState({
        dataSource:dateSource,
        refreshing: false,
        curpage:result.page,//当前页
        totalpage:result.pages,
        isend:result.page>=result.pages
      });
    });
  }
  //到达底部事件
  _onEndReached(event) {
    // load new data
    console.log('reach end', event);
    if(this.state.curpage < this.state.totalpage){
        this.setState({
          isLoading: true,//加载中
          isend:false//是否最后一页
        });
        let querypage = this.state.curpage + 1;
        let that = this;
        this.props.dispatch(this.props.queryfun({
            query: this.props.query,
            options: {
                sort: this.props.sort,
                page: querypage,
                limit: this.props.pagenumber,
            }
        })).then(({result})=> {
          if(!!result){
            _.map(result.docs,(item)=>{
              that.initData.push(item);
            });
          }
          let dateSource =  that.state.dataSource.cloneWithRows([...that.initData]);
          that.setState({
            dataSource:dateSource,
            isLoading: false,
            curpage:result.page,
            totalpage:result.pages,
            isend:result.page>=result.pages
          });
        });
    }
    else{
      this.setState({
        isLoading: false,
        isend:true
      });
    }
  }

  renderHeader(){
    if(!!this.props.renderHeader){
      return this.props.renderHeader();
    }
    return (<div></div>);
  }

  renderSeparator(sectionID, rowID){
    if(!!this.props.renderSeparator){
      return this.props.renderSeparator(sectionID, rowID);
    }
    return (<div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />);
  }

  renderFooter(){
    if(!!this.props.renderFooter){
      return this.props.renderFooter(this.state.isLoading, this.state.isend);
    }
    return (
      <div style={{
      color: '#999',
      padding: "15px",
      textAlign: 'center',
      fontSize: "14px",
      borderTop: "1px solid #EEE"
    }}
    >
      {this.state.isLoading ? 'loading...' : ''}
      {this.state.isend && '－ 没有更多数据了 －'}
    </div>);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.props.updateContent}
        renderSeparator={this.renderSeparator.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        initialListSize={5}
        pageSize={4}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); } }
        onEndReached={this._onEndReached}
        onEndReachedThreshold={10}
        style={{height: this.props.listheight}}
        useZscroller
        scrollerOptions={{ scrollbars: false }}
        refreshControl={<ListView.RefreshControl
          className="my-refresh-control"
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          resistance={1}
        />}
      />
    );
  }
}


Page.propTypes = {
    renderHeader:PropTypes.func,
    renderSeparator:PropTypes.func,
    renderFooter:PropTypes.func,
    queryfun: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    pagenumber: PropTypes.number.isRequired,
    listheight: PropTypes.number.isRequired,
    query : PropTypes.object.isRequired,
    sort : PropTypes.object.isRequired,
};


export default connect()(Page);
