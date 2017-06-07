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
        <div className="userinfo"><img src={avatarURL} className="avatar" alt=""/>
        <span>{RiderName}</span>
        </div>
        <div className="address">
            <div className="startaddress">{srcaddress.addressname}</div>
            <div className="endaddress">{dstaddress.addressname}</div>
        </div>
        <a
            href={`tel:${RiderPhone}`}
            className="call">
            <img src="newimg/p20.png"  alt=""/>
            联系TA
        </a>
    </div>
  );
};

export default PageRiderHead;
