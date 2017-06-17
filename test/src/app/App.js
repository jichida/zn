import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as xview from '../utils/Common.js';
import {alipayUrl,wxpayUrl,xview_geographyLocationCallbackMethod} from '../utils/Common.js';

let sourceData={"title":"夏恒网络XVIEW分享", "descrption":"夏恒网络XVIEW分享。", "picture":"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2378550344,2476789148&fm=58", "url":"http://www.xiaheng.net/"};

class App extends Component {

  constructor(props) {
		super(props);
    this.state={txName:''}
	}

  zfbPay=()=>{
    let param="partner=\"2088521376976114\"&seller_id=\"1742688357@qq.com\"&out_trade_no=\"PC_D1488616952710292\"&subject=\"PC_D1488616952710292\"&body=\"XVIEW alipay\"&total_fee=\"10.01\"&notify_url=\"http://www.yaoquan.com28.cn/servlet/NotifyAlipayServlet\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&sign=\"Ee%2Fo%2B%2BGhOpktpKDw1iJ51glG9wdd0UJ2gji0z5VNeBPZRuKj7OHVp0S%2F6XOgUK7xrPJVqUFWuO06%2Fr4AYzMumH%2F4jI%2B2G3OULhDONmJsBJYCz4%2FVZk9TTWIY7YVlH5Kl28ztJRS5KsfpPbOvXpCytTYwVcydGgVvzDhRXsGIVq8%3D\"&sign_type=\"RSA\"";
    alert(param);
    alipayUrl(param,(data)=>{
      alert(JSON.stringify(data));
    });
  }
  wxPay=()=>{
    let param={appid:"wx2be56c97af373c6b",noncestr:"flOaJHzueF6YaoYq",package:"Sign=WXPay",partnerid:"1420780402",prepayid:"wx2017030416453305ddbf9b350712243602",sign:"5EE3E0C56F9C2F0AEC95AB2FF78DD25F",timestamp:"1488617132"};
    alert(JSON.stringify(param));
    wxpayUrl(param,(data)=>{
      alert(JSON.stringify(data));
    });
  }
  getLocation(){
    try{
      alert(`window.xview:${!!window.xview}`);
      alert(`geographyLocationCallbackMethod:${!!window.xview.geographyLocationCallbackMethod}`);

      window.geographyLocation2=function(result){
        window.alert(JSON.stringify(data));
      };
      window.xview.geographyLocationCallbackMethod("geographyLocation2");
    }catch(e){
      window.alert(e.message);
    }
  }

  getLocation2(){
    try{
      xview.xview_geographyLocationCallbackMethod((data)=>{
        window.alert(JSON.stringify(data));
      })
    }catch(e){
      window.alert(e.message);
    }
  }

  getLocation3(){
    try{
      xview.xview_geographyLocationCallbackMethod((data)=>{
        alert(JSON.stringify(data));
      })
    }catch(e){
      alert(e.message);
    }
  }

  loginQQ=()=>{
    xview.loginToTencentQQ((data)=>{
      alert(JSON.stringify(data));
    })
  }
  loginWx=()=>{
    xview.loginToWeixin((data)=>{
      alert(JSON.stringify(data));
    })
  }

  shareQQ=()=>{
    alert(JSON.stringify(sourceData));
    xview.shareToTencentQQZoneUrl(sourceData,(data)=>{
        alert(JSON.stringify(data));
    });
  }

  shareQQFriend=()=>{
    alert(JSON.stringify(sourceData));
    xview.shareToTencentQQUrl(sourceData,(data)=>{
        alert(JSON.stringify(data));
    });
  }

  shareWechatCircle=()=>{
    alert(JSON.stringify(sourceData));
    xview.shareToWeixinCircleUrl(sourceData,(data)=>{
        alert(JSON.stringify(data));
    });
  }

  sgearWechatFriend=()=>{
    alert(JSON.stringify(sourceData));
    xview.shareToWeixinFriendUrl(sourceData,(data)=>{
        alert(JSON.stringify(data));
    });
  }

  currentLinkWifi=()=>{
    xview.currentLinkWifi((data)=>{
      alert(JSON.stringify(data));
    });
  }

  prepareEasyLink=()=>{
    xview.currentLinkWifi({ssid:'123',password:'456'},(data)=>{
      alert(JSON.stringify(data));
    });
  }

  searchForModules=()=>{
    xview.searchForModules((data)=>{
      alert(JSON.stringify(data));
    });
  }

  getPhoneBook=()=>{
    xview.getPhoneBook((data)=>{
      alert(JSON.stringify(data));
    })
  }

  pushMessage=()=>{
    xview.jiGuangTuiSong(this.state.txName);
    //这里在设置后加上监听方法，具体在哪里申明看业务逻辑
    //未点击推送消息
    window.listenInMessage=(jsonstr)=>{
      alert(eval("("+jsonstr+")"));
    }
    //点击了推送消息
    window.postNotification=(jsonstr)=>{
      alert(eval("("+jsonstr+")"));
    }
  }

  cancelJPushAlisa=()=>{
    xview.cancelJPushAlisa();
  }

  setPushName=(event)=>{
    this.setState({txName:event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br/>
          <button onClick={ this.zfbPay }>支付宝支付</button>
          <button onClick={ this.wxPay }>微信支付</button>
          <button onClick={ this.getLocation.bind(this) }>获取定位</button>
          <button onClick={ this.getLocation2.bind(this) }>获取定位2</button>
          <button onClick={ this.getLocation3.bind(this) }>获取定位2</button>

          <br/>
          <button onClick={ this.loginQQ }>QQ登录</button>
          <button onClick={ this.loginWx }>微信登录</button>

          <br/>
          <button onClick={ this.shareQQ }>分享到QQ空间</button>
          <button onClick={ this.shareQQFriend }>分享给QQ好友</button>
          <button onClick={ this.shareWechatCircle }>分享到微信朋友圈</button>
          <button onClick={ this.sgearWechatFriend }>分享给微信朋友</button>

          <br/>
          <button onClick={ this.currentLinkWifi }>WiFi名</button>
          <button onClick={ this.prepareEasyLink }>连接mico</button>
          <button onClick={ this.searchForModules }>搜索mico</button>
          <button onClick={ this.getPhoneBook }>通讯录</button>

          <br/><br/>
          <input type="text" value={this.state.txName} onChange={ this.setPushName } />
          <button onClick={ this.pushMessage }>设置单推用户名</button>
          <button onClick={ this.cancelJPushAlisa }>取消单推推送</button>

        </p>
      </div>
    );
  }
}

export default App;
