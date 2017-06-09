import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/newcss/carpool.css';
import {
    ui_clickpinchetypebtn,
    getbuscarpool_request,
    orderconfirm_setpinche,
    orderconfirm_setpincheseatnumber
} from '../../actions';
import _ from "lodash";
import {
    WeuiSelectValidation
    } from "../tools/formvalidation";
import {Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {renderDateField} from "../tools/renderdate";

import 'weui';
import 'react-weui/lib/react-weui.min.css';
//最新的代码
class PincheForm extends React.Component{
    render(){
        const { handleSubmit,citylist,FormSubmit } = this.props;
        let newcitylist = _.map(citylist,(city,index)=>{
            return {
                value:city,
                label:city
            }
        })
        return (
            <Form
                onSubmit={handleSubmit(FormSubmit)}
                className="formStyle1"
                >
                <Field
                    name="startcity"
                    id="startcity"
                    Option={newcitylist}
                    component={ WeuiSelectValidation }
                    InputTit="出发地"
                />
                <Field
                    name="endcity"
                    id="endcity"
                    Option={newcitylist}
                    component={ WeuiSelectValidation }
                    InputTit="目的地"
                />
                <Field
                    name="starttime"
                    id="starttime"
                    label="出发时间"
                    component={renderDateField}
                />
                <div className="submitBtn">
                    <botton
                        className="btn Primary"
                        onClick={handleSubmit}>
                        查询
                    </botton>
                </div>
            </Form>
        )
    }
}
PincheForm = reduxForm({
    form: 'selectingFormValues',
    initialValues:{
        starttime : moment(new Date()).format('YYYY-MM-DD'),
        endcity : "常州",
        startcity : "南京"
    }
})(PincheForm);
const selector = formValueSelector('selectingFormValues');
PincheForm = connect(({state,pinche,appui,app:{pinchecitylist:citylist}}) => {
    // can select values individually
    const startcity = selector(state, 'startcity');
    const endcity = selector(state, 'endcity');
    return {
        endcity,
        startcity,
        citylist,
        ...pinche,
        ...appui.pinche,
    };
})(PincheForm);

class Pinche extends React.Component {
    onClickPage(name,routeobj){
        this.props.dispatch(orderconfirm_setpinche(routeobj));
        this.props.history.push(name);
    }
    onClickTabbtn =(newvalue)=>{
        this.props.dispatch(ui_clickpinchetypebtn(newvalue));
    }
    formSubmit =(value)=>{
        let tabtitle = ['专线','人气团拼'];
        let querydata = {
            startcity:value.startcity,
            endcity:value.endcity,
            pinchetype:tabtitle[value.pinchetype],
            startdate:value.starttime
        };
        this.props.dispatch(getbuscarpool_request(querydata));
    }
    render() {

        const {  pinchetypetabbtn } = this.props;
        return (
            <div className="carpoolPage AppPage">
                <div className="pageNav">
                    <span
                        className={pinchetypetabbtn===0?"sel":""}
                        onClick={()=>{this.onClickTabbtn(0)}}
                        >
                        专线
                    </span>
                    <span
                        className={pinchetypetabbtn===1?"sel":""}
                        onClick={()=>{this.onClickTabbtn(1)}}
                        >
                        人气团拼
                    </span>
                </div>

                <PincheForm FormSubmit={this.formSubmit}/>

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
                                                        {groupnumber}成团
                                                        载客{seatnumber}
                                                        {seatnumbertotal}人已参与
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

const mapStateToProps = ({pinche,appui}) => {
    return {...pinche,...appui.pinche};
}
export default connect(
    mapStateToProps,
)(Pinche);
