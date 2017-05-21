/*
    注册司机－车辆信息
*/
import React, { Component } from 'react';
import NavBar from '../../tools/nav.js';
import { Field,Fields,reduxForm,Form} from 'redux-form';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import validate from './validate';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select,
    CellsTitle
    } = WeUI;
import {renderInputField} from '../../tools/renderfield';
import {renderImageupload} from '../../tools/renderimageupload';

class Page extends Component {

    render() {
        const { handleSubmit,previousPage } = this.props;
        return (
            <div className="taxiPage AppPage">
                <NavBar back={false} title="上传照片"
                  leftnav={[
                    {
                      type:"action",
                      action : previousPage,
                      text:"上一步"
                    }
                  ]}
                 />
                <div className="list updataimg">
                    <div className="li">
                        <div className="tit">驾驶证</div>
                        <FormUI>
                          <Field name="Licenseld" label="驾驶证号" placeholder="请输入驾驶证号" type="text" component={renderInputField}/>
                        </FormUI>
                        <div className="desc">有效期内，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <Field name="LicensePhotoldURL" component={renderImageupload}/>
                        </div>
                    </div>
                </div>
                <div className="submitBtn">
                  <botton className="btn Primary"  onClick={handleSubmit}>确定</botton>
                </div>
            </div>
        )
    }
}

export default reduxForm({
  form: 'registerfillwizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(Page)
