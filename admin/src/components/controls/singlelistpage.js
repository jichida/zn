/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component, PropTypes,cloneElement } from 'react';
import { connect } from 'react-redux';
import { propTypes, reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import buildSchema from 'redux-form-schema';
import { Card, CardActions, CardTitle, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import {white, cyan500} from 'material-ui/styles/colors';
//import 'material-design-icons/iconfont/material-icons.css';
import FontIcon from 'material-ui/FontIcon';


import { CreateButton,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,BooleanField } from 'admin-on-rest/lib/mui';


import CircularProgress from 'material-ui/CircularProgress';
class Page extends Component {

    componentDidMount() {
      this.props.crudGetList(this.props.resource);
    }
    componentWillReceiveProps (nextProps) {

    }
    render() {
        if(this.props.ids.length > 0){
          let id = this.props.ids[0];
          let basePath = this.props.location.pathname;
          let pathname=`${basePath}/${encodeURIComponent(id)}/show`;
          // console.log("isobj:" + this.props.ShowPage);
          // console.log("isobj:" + typeof(this.props.ShowPage));
        //  return (<div>?</div>);
          const ShowPage = this.props.ShowPage({
              ...this.props,
              location:{pathname:pathname},
              params:{id:id},
              hasEdit:this.props.hasEdit
            });
          return (<div>{ShowPage}</div>);
          // const ShowPage = this.props.ShowPage;
          // return (<ShowPage  {...this.props}
          //     location={{pathname:pathname}}
          //     params={{id:id}}
          //     hasEdit={true}
          //   />);
          // return  (<div>{this.props.ShowPage &&
          //   cloneElement(this.props.ShowPage,{
          //     ...this.props,
          //     location:{pathname:pathname},
          //     params:{id:id},
          //     hasEdit:true
          //   }
          //   )
          //   }
          // </div>);
          //return <SystemconfigShow {...this.props} location={{pathname:pathname}} params={{id:id}} hasEdit={true}/>
        }
        return <CircularProgress size={60} thickness={7} />;
    }
}


const mapStateToProps = (state,props) => {
  const resourceState = state.admin[props.resource];
  let page = {
    ids: resourceState.list.ids,
  };
  console.log("page:" + JSON.stringify(page));
  return Object.assign({},page);
};

const mapDispatchToProps = (dispatch) => {
  return {
    crudGetList:(resource)=>{
      dispatch({
        type: 'CRUD_GET_LIST',
        payload: {},
        meta: { resource, fetch: 'GET_LIST', cancelPrevious: true },
      });
    }
  };
}

// export default reduxForm({
//     form: 'signIn',
//     validate: signInSchema.validate,
//     destroyOnUnmount: true,
// })(connect(mapStateToProps, mapDispatchToProps)(SignIn));

Page = connect(mapStateToProps, mapDispatchToProps)(Page);
export default Page;
// export default reduxForm({
//     form: 'signIn',
//     validate: signInSchema.validate,
//     destroyOnUnmount: true,
// })(SignIn);
