/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A. 5. 3. 订单撤销接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传订单撤销信息。
// 接口定义见表 A.35 。
//orderCancel
/*
 订单信息（阶段N)，程序获取
 */
// let Platform_orderCancelSchema= new Schema({
//     CompanyId:String,	//	是	字符型	V32	公司标识
//     Address:Number,//	是	数字型	F6	上车地点行政区划代码	见 GBjT 2260
//     OrderId:String,	//	是	字符型	V64	订单编号
//     OrderTime:Date,//	否	数字型	F14	订单时间	YYYYMMDDhhmmss
//     CancelTime:Date,//	是	数字型	F14	订单撤销时间	YYYYMMDDhhmmss
//     Operator:String,	//	 是	字符型	V64	  撤销发起方	1.乘客2:驾驶员3 .平台公司
//     CancelTypeCode:String,	//	 是  字符型	  V32	  撤销类型代码	1:乘客提前撤销2:驾驶员提前撤销3:平台公司撤销4 .乘客违约撤销5 .驾驶员违约撤销
//     CancelReason:String,	//	否	字符型	  V128	撤销或违约原因
// });
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
let dbplatform = require('../../db/modelsplatform.js');
const moment = require('moment');
const utilarea = require('../../util/getarea');
// "srcaddress" : {
//     "location" : {
//         "lng" : 118.728138148353,
//             "lat" : 31.9910114596804
//     },
//     "addressname" : "江苏省南京市建邺区沙洲街道南京市建邺实验小学"
// },
// "dstaddress" : {
//     "location" : {
//         "lng" : 118.798542,
//             "lat" : 31.968791
//     },
//     "addressname" : "南京市江宁区玉兰路98号南京南站"
// },
const reasonflag = {
  '1':'乘客提前撤销',
  '2':'驾驶员提前撤销',
  '3':'平台公司撤销',
  '4':'乘客违约撤销',
  '5':'驾驶员违约撤销'
};

exports.insertOrderCancel  = ({triprequest,triporder,canceltypecode='1'},postaction)=> {
    let orderCancelDoc = {
        CompanyId:config.CompanyId,
        OrderId:triporder._id,
        OrderTime:moment(triporder.created_at).format('YYYY-MM-DD HH:mm:ss'),
        CancelTime:moment(triporder.updated_at).format('YYYY-MM-DD HH:mm:ss'),
        Operator:'1',//撤销发起方	1.乘客2:驾驶员3 .平台公司
        CancelTypeCode:canceltypecode,//	 是  字符型	  V32	  撤销类型代码	1:乘客提前撤销2:驾驶员提前撤销3:平台公司撤销4 .乘客违约撤销 5 .驾驶员违约撤销
        CancelReason:reasonflag[canceltypecode],
    };
    utilarea.getarea({latlng:triporder.srcaddress.location},(address)=>{
        if(!!address){
            orderCancelDoc.Address = address.adcode;
            let eModel = dbplatform.Platform_orderCancelModel;
            let entity = new eModel(orderCancelDoc);
            entity.save((err,result)=> {
                if (!err && !!result) {
                    postaction('save','ordercancel',result);
                }
            });
        }
    });
}
