import React from 'react'
import { connect } from 'react-redux';
import {
  View,Container,NavBar
} from 'amazeui-touch';
import renderHTML from 'react-render-html';
import {getabouthtml_request} from '../../actions';

export class Page extends React.Component {

  componentWillMount () {
    this.props.dispatch(getabouthtml_request({
      keyname:this.props.match.params.keyname
    }));
  }

  onClickBack =()=>{
    this.props.history.goBack();
  }

  render() {
    const itemLeft = {
      title: '返回'
    };
    const dataLeft = {
      title: this.props[this.props.match.params.keyname].title,
      leftNav: [{...itemLeft, icon: 'left-nav'}],
      onAction:this.onClickBack,
    };

 return (
<View>
<NavBar {...dataLeft}/>
   <Container scrollable={true}>
        <div className="group margin-top-0">
          <div className="group-body">
            {renderHTML(this.props[this.props.match.params.keyname].desc)}
          </div>
        </div>
      </Container>
    </View>
 );
  }
}


const mapStateToProps = ({about}) => {
  return about;
}

export default connect(mapStateToProps)(Page);
