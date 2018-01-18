require('es6-promise').polyfill();
require('isomorphic-fetch');
const _ = require('lodash');

const key = 'dadfa0897bd9c8cff9cffdf330974b55';
//http://restapi.amap.com/v3/geocode/geo?parameters
const getareasz = ({deplatlng,destlatlng},callbackfn)=>{
  const url = `http://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${deplatlng.lng},${deplatlng.lat}|${destlatlng.lng},${destlatlng.lat}&batch=true`;
  // console.log(`url==>${url}`);
  // "key=" + key + "&location=" + location[0] + "," + location[1] +
  // "&poitype=商务住宅&radius=0&extensions=base&batch=false&roadlevel=0";
  return fetch(url).then((res)=>{
    return res.json();
  }).then((json)=> {
    // console.log(json);
    const regeocodes = json.regeocodes;
    if(regeocodes.length === 2){
      let OnArea = _.get(regeocodes[0],'addressComponent.adcode',0);
      let DestArea = _.get(regeocodes[1],'addressComponent.adcode',0);
      if(typeof OnArea === 'string'){
        OnArea = parseInt(OnArea);
      }
      if(typeof DestArea === 'string'){
        DestArea = parseInt(DestArea);
      }
      callbackfn({OnArea,DestArea});
    }
    else{
      callbackfn();
    }
  }).catch((e)=>{
    console.log(e);
    callbackfn();
  });
}

//http://restapi.amap.com/v3/geocode/geo?parameters
const getarea = ({latlng},callbackfn)=>{
  const url = `http://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${latlng.lng},${latlng.lat}`;
  // console.log(`url==>${url}`);
  // "key=" + key + "&location=" + location[0] + "," + location[1] +
  // "&poitype=商务住宅&radius=0&extensions=base&batch=false&roadlevel=0";
  return fetch(url).then((res)=>{
    return res.json();
  }).then((json)=> {
    // console.log(json);
    const regeocode = json.regeocode;
    if(!!regeocode){
      let adcode = _.get(regeocode,'addressComponent.adcode',0);
      adcode = parseInt(adcode);
      callbackfn({adcode});
    }
    else{
      callbackfn();
    }
  }).catch((e)=>{
    console.log(e);
    callbackfn();
  });
}

// getarea({
//       latlng:{
//             "lng" : 118.729411,
//             "lat" : 32.008663
//         }
//       },(address)=>{
//   console.log(address);
// });

// getareasz({
//   deplatlng:{
//         "lng" : 118.729411,
//         "lat" : 32.008663
//     },
//     destlatlng:{
//           "lng" : 118.729411,
//           "lat" : 32.008663
//       },
//
//       },(address)=>{
//   console.log(address);
// });

exports.getareasz = getareasz;
exports.getarea = getarea;
