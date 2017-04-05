import React from 'react';
import { connect } from 'react-redux';
import config from '../config.js';
import {
    View,
    NavBar,
    Container,
    Button
} from 'amazeui-touch';

import {getemerygencycontact_request} from '../actions';

export class Page extends React.Component {

    componentWillMount () {
        console.log('componentWillMount=======>');
        this.props.dispatch(getemerygencycontact_request());
    }
    onClickBack(){
        this.props.history.goBack();
    }

    onClickAdd(){
        this.props.history.push('/seladdressbook');
    }

    render() {
        const itemLeft = {
            title: '返回'
        };
        const dataLeft = {
            title: '紧急联系人',
            leftNav: [{...itemLeft, icon: 'left-nav'}],
            onAction: ()=>{
                this.props.history.goBack();
            },
        };

        let conactitemco = [];
        this.props.concatlist.forEach((contactitem)=>{
            conactitemco.push(<li key={contactitem._id} className="item item-linked"><a href="#"><h3 className="item-title">{contactitem.name}</h3></a></li>);
        })
        return (<View>
            <NavBar {...dataLeft}/>
            <Container>
                <p className="padding margin-bottom-0">为了保证您的行程安全，请添加紧急联系人</p>
                <div className="group group-no-padded margin-top-0">
                    <div className="group-body">
                        <ul className="list">
                            <li onClick={this.onClickAdd.bind(this)} className="item item-linked"><a><h3 className="item-title">添加紧急联系人</h3><span className="icon icon-right-nav item-icon"></span></a></li>
                        </ul>
                    </div>

                </div>
                <div className="group group-no-padded">
                    <header className="group-header">已有联系人</header>
                    <div className="group-body">
                        <ul className="list">
                            {conactitemco}
                        </ul>
                    </div>
                </div>
            </Container>
        </View>);
    }
}

const mapStateToProps = ({emerygencycontact}) => {
    return emerygencycontact;
}

export default connect(
    mapStateToProps,
)(Page);