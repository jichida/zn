import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';

class Page extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <Paper zDepth={2}>
            <EditTable
                rows={this.props.rows}
                headerColumns={this.props.headers}
              />
            </Paper>
        );
    }
}

const mapStateToProps = (state, props) => {
  let {source, record} = props;
  let rows = [];
  let carpoolprice = record.carpoolprice;
  let startstations = record.startstations;
  let endstations = record.endstations;
  for(let i = 0;i < startstations.length ;i++){
    for(let j = 0; j < endstations.length ; j++){
      if(!carpoolprice.hasOwnProperty(startstations[i])){
        carpoolprice[startstations[i]] = {};
      }
      if(carpoolprice[startstations[i]].hasOwnProperty(endstations[j])){
        rows.push(
          {columns: [
          {value: startstations[i]},
          {value: endstations[j]},
          {value: carpoolprice[startstations[i]][endstations[j]]},
          ]}
        );
        continue;
     }
     carpoolprice[startstations[i]][endstations[j]] =0;

     rows.push(
       {columns: [
       {value: startstations[i]},
       {value: endstations[j]},
       {value: 0},
       ]}
     );
    }
  }

  let headers = [
     {value: '出发站点', type: 'ReadOnly', width: 200},
     {value: '目的站点', type: 'ReadOnly', width: 200},
     {value: '价格', type: 'ReadOnly', width: 200},
  ];
  let page = {
    rows:rows,
    headers:headers
  };
  return Object.assign({},state,page);
}

export  default  connect(
  mapStateToProps,
)(Page);
