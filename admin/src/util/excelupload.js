import {requestpostdatawithtoken} from '../util/util.js';
import config from '../env/config.js';

// export function fileupload(e,config,callbackfn){
//     const {usertoken,...restconfig} = config;
//     e.preventDefault();
//     let files;
//     if (e.dataTransfer) {
//         files = e.dataTransfer.files;
//     } else if (e.target) {
//         files = e.target.files;
//     }
//     let v = files[0];
//     let imgInfo = {};
//     const picaphoto = new PicaDisposePhoto(restconfig);
//     picaphoto.disposePhotoWithFile(v,imgInfo).then((blob)=>{
//       console.log('onChange call setimage:' + v.filename);
//       const data = new FormData();
//       data.append('usertype','rider');
//       data.append('filename', v.name );
//       data.append('file', blob);
//       requestpostdatawithtoken('/upload',usertoken,data,(issuc,result)=>{
//           console.log("issuc:" + issuc);
//           console.log("result:" + JSON.stringify(result));
//           callbackfn(issuc,result);
//       });
//     });
// }


export const excelupload = (e,{usertoken},callbackfn)=>{
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
      files = e.dataTransfer.files;
  } else if (e.target) {
      files = e.target.files;
  }
  let fileobj = files[0];
  let file = fileobj;
  console.log(file);
  console.log('onChange call setimage:' + file.filename);
  const reader = new FileReader();
  reader.onload = () => {
    const bin = atob(reader.result.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const excel = new Blob([buffer.buffer], {
      type: 'application/vnd.ms-excel',
    });

    const data = new FormData();
    data.append('filename', file.name||'a.xls' );
    data.append('file', excel);
    requestpostdatawithtoken(`${config.serverurl}/uploadexcel`,usertoken,data,(issuc,result)=>{
        console.log("issuc:" + issuc);
        console.log("result:" + JSON.stringify(result));
        callbackfn(issuc,result);
    });

  };
  reader.readAsDataURL(file);
}
