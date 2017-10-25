let islocalhost = false;
let config = {
    serverurl:islocalhost?'http://localhost:3004':'http://zn.tczncx.com/',
    requesttimeout:5000,
    intervalrequestnearbydriver:4000
};

export default config;
