import React from 'react';
import {Upload} from 'antd/lib/upload';
import {Icon} from 'antd/lib/icon';
import {message} from 'antd/lib/message';
import { connect } from 'react-redux';
//import 'antd/dist/antd.css';
import './imageupload.css';
import config from '../../env/config.js';
import {
    set_weui
} from '../../actions';

let renderImageupload= (props) => {

    let {input,loading, meta: { touched, error}} = props;
    let usertype = localStorage.getItem("usertype");
    let usertoken = localStorage.getItem(`${usertype}_user_token`);
    // let getBase64 = (img, callback)=> {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    let beforeUpload =(file)=> {
        //const isImage = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        // }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isLt2M;
    }

    let handleChange = (info) => {
        loading(true);
        if (info.file.status !== 'uploading') {
            loading(false);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          if(info.file.response.files.length > 0){
            //"url": "http://localhost:3004/uploader/IMG_3047.JPG",
            input.onChange(info.file.response.files[0].url);
          }

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }

    }
  let imageUrl = input.value;

  if(touched && error){
      window.setTimeout(()=>{
        let toast = {
            show : true,
            text : error,
            type : "warning"
        }
        props.dispatch(set_weui({ toast }));
      },10)
  }

  return (
    <Upload
       className="avatar-uploader"
       name="file"
       showUploadList={false}
       action={config.serverurl + "/uploadavatar"}
       headers={{
          'Authorization':'Bearer '+usertoken
       }}
       beforeUpload={beforeUpload}
       onChange={handleChange}
     >
       {
         imageUrl ?
           <img src={imageUrl} alt="" className="avatar" /> :
           <Icon type="plus" className="avatar-uploader-trigger" />
       }
     </Upload>
   );

}

renderImageupload = connect()(renderImageupload);
export  {renderImageupload};
