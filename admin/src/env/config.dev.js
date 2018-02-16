let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3005':'http://znapi.i2u.top';
export default {
    restserverurl:`${serverurl}/adminapi`,
    adminauthserverurl:`${serverurl}/adminauth`,
    serverurl:serverurl
};
