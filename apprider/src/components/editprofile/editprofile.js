import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field,Fields, reduxForm,Form  } from 'redux-form';

import DatePicker from 'react-mobile-datepicker';
import config from '../../config.js';
import {fileupload} from '../../util/fileupload.js';
import {
  fillprofile_request,
  ui_editprofilesetbirthdayshow
} from '../../actions';


import {
  Container,
  View,
  NavBar,
} from 'amazeui-touch';

let renderEditprofile = (props)=>{
  let onChangeFieldname=(fieldname,e)=>{
    props[fieldname].input.onChange(e.target.value);
  }
  let handleClick=()=>{
    props.dispatch(ui_editprofilesetbirthdayshow(true));
   }

   let handleCancel=()=>{
      props.dispatch(ui_editprofilesetbirthdayshow(false));
   }

   let handleSelect=(time)=> {
     props.dispatch(ui_editprofilesetbirthdayshow(false));
     props.birthday.input.onChange(time);
   }


   let fileChange=(event)=>{
     fileupload(event,localStorage.getItem('zhongnan_rider_token'),(issuc,result)=>{
       if(issuc){
         props.avatar.input.onChange(config.serverurl + result.url);
       }
     });
   }
   return (  <div className="group-body">
       <ul className="list">

       <li className="item item-input">
         <div className="item-main">
           <label className="field-container">
             <span className="item-title">
               修改头像
             </span>
             <div className="item-after">
                <img src={props.avatar.input.value} className="user_tximg" alt='img'/>
                <input type="file" id="cpic" name="cpic" onChange={fileChange }
                  style={
                      {
                        filter:"alpha(opacity=0)","MozOpacity":"0.0",
                        "KhtmlOpacity":0.0,opacity:0.0,position:"absolute",
                        right: "5px",top:"10px",zIndex:"9"
                      }
                    }
                />
             </div>
            </label>
            </div>
            <span className="icon icon-right-nav item-icon">
            </span>
       </li>


       <li className="item item-input"><div className="item-main">
       <label className="field-container"><span className="field-label">昵称</span>
       <input type="text" icon="person" className="field"
       onChange={(e)=>{onChangeFieldname('nickname',e);}}
       value={props.nickname.input.value}
       /></label></div></li>

       <li className="item item-input"><div className="item-main"><label className="field-container">
       <span className="field-label">性别</span>

       <select className="borderless padding-left-0 margin-0"
       value={props.sex.input.value}
       onChange={(e)=>{onChangeFieldname('sex',e);}}>
       <option value={"男"}>男</option>
       <option value={"女"}>女</option>
       </select>

       </label></div></li>
       <li className="item item-input"  onClick={handleClick}><div className="item-main">
       <label className="field-container"><span className="field-label">生日</span>
         <span >{moment(props.birthday.input.value).format("YYYY-MM-DD")}
       <DatePicker
         value={props.birthday.input.value}
         isOpen={props.birthdaydateopen}
         onSelect={handleSelect}
         onCancel={handleCancel}
         dateFormat={['YYYY年', 'MM月', 'DD日']}
         /></span>
          </label>

       </div></li>
       </ul>
     </div>
);
};

const mapStateToProps1 = ({appui}) => {
  return {...appui.editprofile};
}
renderEditprofile = connect(mapStateToProps1)(renderEditprofile);

let EditprofileForm = (props)=>{
  let {handleSubmit} = props;
  let totalprice = 0;
  return (
      <Form onSubmit={handleSubmit(props.onClickOK)}>
      <Fields names={['nickname', 'avatar', 'sex', 'birthday']}
              component={renderEditprofile}/>
      <div className="padding">
        <button className="btn btn-primary btn-block">确定</button>
      </div>
      </Form>
    );
};



export class Page extends React.Component {

  componentWillMount () {
  }

   onClickOK =(values)=>{
    console.log("ok:" + JSON.stringify(values));
    this.props.dispatch(fillprofile_request(values));
    this.props.history.goBack();
  }

   render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '编辑资料',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          this.props.history.goBack();
        },
      };
       let birthday = this.props.birthday;
       if(birthday){
           if (typeof birthday === 'string') {
               birthday = new Date(Date.parse(birthday));
           }
       }
       else{
           birthday = new Date();
           birthday.setFullYear(1990,1,1);
       }

      EditprofileForm = reduxForm({
        form: 'editprofile',
        initialValues:{
          nickname:this.props.nickname||'',
          avatar:this.props.avatar||'images/user.jpg',
          sex:this.props.sex||'男',
          birthday:birthday,
        }
      })(EditprofileForm);
      return ( <View>
           <NavBar {...dataLeft}/>
           <Container scrollable={true}>
          <div className="group group-no-padded">
            <EditprofileForm onClickOK = {this.onClickOK} />
            </div>
          </Container>
         </View>);
    }
}

const mapStateToProps = ({userlogin}) => {
  return {...userlogin.profile}
};

export default connect(mapStateToProps)(Page);
