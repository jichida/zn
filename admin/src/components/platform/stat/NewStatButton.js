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
import config from '../../../env/config.js';
import {statOneAction} from './action';

import { ListButton, DeleteButton } from 'admin-on-rest';
const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

let NewStatButton = (props) => {
  const onClick = ()=>{
    const {dispatch,resource} = props;
    statOneAction({resource},dispatch)
  }
  console.log(props);
  return (
        <FlatButton
         primary
         label="新建统计"
         onClick={onClick}
         style={{ overflow: 'inherit' }}  >
       </FlatButton>
  );
};

NewStatButton = connect()(NewStatButton);
export default NewStatButton;
