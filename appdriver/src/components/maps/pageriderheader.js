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
        <div className="userinfo">
            <img src={avatarURL} className="avatar" alt=""/>
            <span>{RiderName}</span>
            { !!RiderPhone &&
              <a href={`tel:${RiderPhone}`} className="call">
                  联系TA
              </a>
            }
        </div>
        <div className="address">
            <div className="startaddress">{srcaddress.addressname}</div>
            <div className="endaddress">{dstaddress.addressname}</div>
        </div>
        
    </div>
  );
};

export default PageRiderHead;
