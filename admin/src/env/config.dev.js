let islocalhost = false;
let serverurl = islocalhost?'http://localhost:3005':'http://api.tczncx.com';
export default {
    restserverurl:`${serverurl}/adminapi`,
    adminauthserverurl:`${serverurl}/adminauth`,
    serverurl: serverurl,
    version:'1.0.2'
};
