import React from 'react'
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {getabouthtml_request} from '../../actions';
import NavBar from '../tools/nav.js';
import {opendownloadurl} from '../../env/os';
import _ from 'lodash';

export class Page extends React.Component {
    componentWillMount () {

    }
    onClickBack =()=>{
        this.props.history.goBack();
    }
    download=(v)=>{
        const {downloadurl_android,downloadurl_ios} = this.props;
        let url;
        if(v === 'android'){
          url = downloadurl_android;
        }
        else if(v === 'ios'){
          url = downloadurl_ios;
        }
        console.log(`download url ${url}`);
        opendownloadurl(url);
    }
    render() {
      let title = _.get(this.props['gotodriver'],'title','司机入驻');
      let desc = _.get(this.props['gotodriver'],'desc',`<img src="newimg/r1.png" />`);
        return (
            <div className="settingPage AppPage">
                <NavBar back={true} title={title} />
                <div className="list gotodriver">
                    {renderHTML(desc)}
                    <div>
                        <img src="newimg/r2.png" onClick={this.download.bind(this, "android")} />
                        <img src="newimg/r3.png" onClick={this.download.bind(this, "ios")} />
                    </div>
                </div>
            </div>
        );
    }
}

const data =  ({app:{downloadurl_android,downloadurl_ios},about}) =>{
    return {downloadurl_android,downloadurl_ios,...about};
};
export default connect(data)(Page);
