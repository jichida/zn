import React from 'react';


let PageRiderHead =(props)=>{
  const {
    currentorder:{
      srcaddress,
      dstaddress,
      riderinfo : {
         RiderPhone,
         RiderName,
         avatarURL
      },
    }
  } = props;

  return (
    <div className="orderinfohead">
        <img src={avatarURL} className="avatar"/>
        <span>{RiderName}</span>
        <div className="address">
            <div className="startaddress">{srcaddress.addressname}</div>
            <div className="endaddress">{dstaddress.addressname}</div>
        </div>
        <a
            href={`tel:${RiderPhone}`}
            className="call">
            <img src="newimg/22.png" />
            联系TA
        </a>
    </div>
  );
};

export default PageRiderHead;
