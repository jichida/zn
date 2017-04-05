import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    View,
    NavBar,
} from 'amazeui-touch';
import {getoftenuseaddress_request} from '../actions';

export class Page extends React.Component {

    componentWillMount () {
        this.props.dispatch(getoftenuseaddress_request());
    }
    onClickPage(name){
        this.props.history.push('/search/' + name);
    }

    onClickBack(){
        this.props.history.goBack();
    }

    render() {
        const itemLeft = {
            title: '返回'
        };
        const dataLeft = {
            title: '常用地址',
            leftNav: [{...itemLeft, icon: 'left-nav'}],
            onAction: ()=>{
                this.props.history.goBack();
            },
        };
        let homeaddressname = '';
        let companyaddressname ='';
        if(this.props.hasOwnProperty('home')){
            homeaddressname = this.props.home.name;
        }
        if(this.props.hasOwnProperty('company')){
            companyaddressname = this.props.company.name;
        }
        return (
            <View>
                <NavBar {...dataLeft}/>
                <Container scrollable={true}>
                    <div className="group group-no-padded">
                        <div className="group-body">
                            <ul className="list">
                                <li onClick={this.onClickPage.bind(this,'home')} className="item item-linked"><a><div className="item-media"><span className="icon icon-home text-primary"></span></div>
                                    <h3 className="item-main item-title"><div>设置家的地址<p className="margin-0 gray">{homeaddressname}</p></div></h3>
                                    <span className="icon icon-right-nav item-icon"></span></a>
                                </li>
                                <li  onClick={this.onClickPage.bind(this,'company')} className="item item-linked"><a><div className="item-media"><span className="icon icon-jtxx text-primary"></span></div>
                                    <h3 className="item-main item-title"><div>设置公司的地址<p className="margin-0 gray">{companyaddressname}</p></div></h3>
                                    <span className="icon icon-right-nav item-icon"></span></a></li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </View>
        );
    }
}



const mapStateToProps = ({oftenuseaddress}) => {
    return oftenuseaddress;
}


export default connect(
    mapStateToProps,
)(Page);
