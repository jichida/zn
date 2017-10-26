let localhost = false;
let config = {
    serverurl:localhost?'http://localhost:3004':'http://api.tczncx.com/',
    requesttimeout:5000,
    appversion:'1.0.0',
    sendlocationinterval:20000,
};

export default config;
