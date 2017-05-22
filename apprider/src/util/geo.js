import geolib from 'geolib';
import {getcurrentlocationfn} from '../env/geo';

export const getcurrentpos =()=> {
  return new Promise(resolve => {
     getcurrentlocationfn((locz)=>{
        if(locz[0] !== 0 && locz[1] !== 0){
          resolve({lat:locz[1],lng:locz[0]});
        }
      });
  });
}

let getstringofdistance2 = (leftdistance)=>{
  let leftdistancetxt = '';
  if(leftdistance >= 1000){
    leftdistancetxt = (leftdistance/1000) + '千米';
  }
  else{
    leftdistancetxt = leftdistance + '米';
  }
  return leftdistancetxt;
};

export const getdistance =(fromlocation,tolocation)=>{
  let distance = geolib.getDistance(
    {latitude: fromlocation[1], longitude: fromlocation[0]},
    {latitude: tolocation[1], longitude: tolocation[0]}
  );
  return getstringofdistance2(distance);
}

export const getstringofdistance=(distance)=>{
  return  getstringofdistance2(distance);
};

export const getstringoftime=(leftduring)=>{
  let leftduringtxt = '';
  if(leftduring >= 60){
    leftduringtxt = leftduring/60 + '分';
  }
  else{
    leftduringtxt = leftduring + '秒';
  }
  return leftduringtxt;
}
