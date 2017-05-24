import React from 'react';
import { connect } from 'react-redux';
import AddressBook from './AddressBook';

import {getcontactlist} from '../../../env/addressbook.js';
import {getphoneconcatlist} from '../../../actions';

export class Page extends React.Component {

  componentWillMount () {
    getcontactlist((datas)=>{
      this.props.dispatch(getphoneconcatlist(datas));
    });
  }

  onClickAddressItem(name,phone){
    //browserHistory.goBack();
    // this.props.sendSrvData('server/rider',{
    //   cmd:'insertemerygencycontact',
    //   data:{
    //     name:name,
    //     tel:phone
    //   }
    // });
    // browserHistory.goBack();
  }
  render() {

     return (
        <div>
            <AddressBook gotoTelephoneABDetailHandler={this.onClickAddressItem.bind(this)} datas={this.props.datas} />
        </div>
      );
  }
}


const data = ({emerygencycontact:{phoneconcatlist:datas}}) => {
    return {datas};
}

export default connect(data)(Page);
