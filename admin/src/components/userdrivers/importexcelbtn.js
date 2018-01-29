import React from 'react';
import { connect } from 'react-redux';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import config from '../../env/config.js';
import {uploadExcelAction} from './action';

import { ListButton, DeleteButton } from 'admin-on-rest';
const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

let ImportExcelButton = (props) => {

  const fileChange = (event)=>{
    const {dispatch} = props;
    uploadExcelAction({event},dispatch);
  }
  return (
        <FlatButton
         primary
         label="导入Excel"
         icon={<ActionBack />}
         style={{ overflow: 'inherit' }}  >
         <input type="file" id="cpic" name="cpic" onChange={fileChange}
                               style={
                               {
                                   filter:"alpha(opacity=0)","MozOpacity":"0.0",
                                   "KhtmlOpacity":0.0,opacity:0.0,position:"absolute",
                                   right: 0,top:0,zIndex:"9",
                                   height:"63px",
                                   left:0,width:"100%"
                               }
                           }
                           />
       </FlatButton>
  );
};
ImportExcelButton = connect()(ImportExcelButton);
export default ImportExcelButton;
