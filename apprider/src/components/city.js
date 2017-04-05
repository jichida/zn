import React from 'react';
import citysel from './citysel.js';
import { connect } from 'react-redux';
import {
  Container,
  View,
  NavBar,
  List,
} from 'amazeui-touch';
import {setcurselcity} from '../actions';

export class Page extends React.Component {

  componentWillMount () {
  }
  onClickSelCity(cityobj){
    this.props.dispatch(setcurselcity(cityobj));
    this.props.history.goBack();
  }
  scrollToAnchor(idname){
    document.querySelector(idname).scrollIntoView();
  }
    render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '选择城市',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          this.props.history.goBack();
        },
      };
      let lettersz = [];
      let items = [];
      for(var cityletter in citysel){
          items.push(<List.Item role="header"  key={'header'+cityletter} id={cityletter}>{cityletter}</List.Item>);
          citysel[cityletter].forEach((cityobj)=>{
            items.push(<List.Item title={cityobj.cityname} onClick={this.onClickSelCity.bind(this,cityobj)}
            key={cityobj.cityname}
              />)
          });
          lettersz.push(<li key={'letter'+cityletter} onClick={this.scrollToAnchor.bind(this,'#'+cityletter)}>{cityletter}</li>);
      }

      let hotcitybtns = [];
      this.props.hotcity.forEach((cityboj)=>{
        hotcitybtns.push(<button onClick={this.onClickSelCity.bind(this,cityboj)} key={cityboj.zipcode}  className="btn btn-hollow">{cityboj.cityname}</button>);
      });
      return (
       <View>
           <NavBar {...dataLeft}/>
           <Container scrollable={true}>

           <div className="container container-fill container-scrollable">
           <div className="padding"><p>当前定位城市：</p>
           <button onClick={this.onClickSelCity.bind(this,this.props.curcity)} className="btn btn-hollow">{this.props.curcity.cityname}</button><hr className="margin-0" / >
           <p>热门城市：</p>
           {hotcitybtns}
           </div>
            <div className="contact_left">
              <List className="margin-top-0">
                  {items}
                </List>
               </div>
               <div className="contact_right">
     <ul className="list background">
      {lettersz}
     </ul>
               </div>
             </div>
           </Container>
         </View>

      );
    }
  }


const mapStateToProps = ({city}) => {
    return city;
}

  export default connect(
    mapStateToProps
  )(Page);
