import geolib from 'geolib';
export * from '../env/geo';

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
