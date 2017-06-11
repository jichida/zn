import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/newcss/carpool.css';
import {
    setpinchequery,
    orderconfirm_setpinche,
    getbuscarpool_request
} from '../../actions';
import _ from "lodash";
import NavBar from '../tools/nav.js';

class PincheQuery extends React.Component {
    onClickPage(name,routeobj){
        this.props.dispatch(orderconfirm_setpinche(routeobj));
        this.props.history.push(name);
    }
    componentWillMount () {
        let querydata = this.props.query;
        this.props.dispatch(getbuscarpool_request(querydata));
    }

    render() {
        return (
            <div className="carpoolPage AppPage">
                <NavBar back={true} title="查询路线" />
                <div className="listcontent">
                    {
                        _.map(this.props.resultroute, (routeobj, index)=>{
                            console.log(routeobj);
                            const {
                              pinchetype,
                              starttime,
                              startcity,
                              endcity,
                              groupnumber,
                              seatnumbertotal,
                              seatnumber,
                            } = routeobj;
                            return (
                                <div
                                    className="li"
                                    key={index}
                                    >
                                    {
                                          pinchetype==="专线"?(
                                            <div className="licontent">
                                                <div className="time">{starttime}</div>
                                                <div className="city">
                                                    {startcity}——{endcity}
                                                    <p
                                                        className="text-warning margin-top-0"
                                                        >
                                                        <span>{groupnumber}成团</span>
                                                        <span>载客{seatnumber}</span>
                                                        <span>{seatnumbertotal}人已参与</span>
                                                    </p>
                                                </div>
                                                <div className="bbtn">
                                                {seatnumber > seatnumbertotal?
                                                    <span
                                                        onClick={this.onClickPage.bind(this,'/orderconfirm/pinche',routeobj)}
                                                        className="btn Primary">
                                                        参团
                                                    </span>:
                                                    <span> 已满 </span>
                                                  }
                                                </div>
                                            </div>
                                        ):""
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({pinche}) => {
    return {...pinche};
}
export default connect(
    mapStateToProps,
)(PincheQuery);
