// var json = {
//     "voiceName":     "文件名称"
// };
// window.xview.xviewVoicePrompt(JSON.stringify(json));
// 那voiceName 就是audio1.mp3、audio2.mp3、audio3.mp3、audio4.mp3、audio5.mp3 对应 第一句、第二句、第三句、第四句、第五句
// audio1.mp3 正在为你寻找车辆，
// audio2.mp3 司机已接单，请保持电话畅通，司机会第一时间联系你，
// audio3.mp3，已到达目的地，下车时请拿好随身物品。
// audio4.mp3，你有新的订单，请及时查看，
// audio5.mp3，到达目的，请提醒顾客拿好随身物品。
//
/**
 * Created by wangxiaoqing on 2017/5/27.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./audio.prod');//暂时调试
} else {
    module.exports = require('./audio.dev');
}
