/**
 * Created by eugenia on 14.01.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import moment from 'moment';

const EditButton = ({basePath = '', record = {}, label = '编辑'}) => {
  let today = moment().format('YYYY-MM-DD');
  let startdate = record.startdate;

  if(startdate < today){
    return null;
  }
  return (<FlatButton
    primary
    label={label}
    icon={<ContentCreate />}
    containerElement={<Link to={`${basePath}/${encodeURIComponent(record.id)}`}/>}
    style={{overflow: 'inherit'}}
  />);
}

EditButton.propTypes = {
  basePath: PropTypes.string,
  record: PropTypes.object,
};

export default EditButton;
