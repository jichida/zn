let islocalhost = true;
let serverurl = islocalhost?'http://localhost:3005':'http://api.tczncx.com';
export default {
    restserverurl:`${serverurl}/adminapi`,
    adminauthserverurl:`${serverurl}/adminauth`,
    serverurl:serverurl
};
