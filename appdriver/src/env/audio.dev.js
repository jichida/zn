
const audiomap = {
  'audio1':'正在为你寻找车辆',
  'audio2':'司机已接单，请保持电话畅通，司机会第一时间联系你，',
  'audio3':'已到达目的地，下车时请拿好随身物品。',
  'audio4':'你有新的订单，请及时查看',
  'audio5':'到达目的，请提醒顾客拿好随身物品。'
}
const playaudio = (audioname)=>{
  console.log(`开始播放语音:${audiomap[audioname]}`);
}

export {playaudio};
