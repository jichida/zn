let islocalhost = false;
let serverurl = islocalhost?'http://localhost:3004':'http://zn.com28.cn:3004';
export default {
    restserverurl:`${serverurl}/adminapi`,
    adminauthserverurl:`${serverurl}/adminauth`,
    serverurl:serverurl
};
