let islocalhost = false;
let config = {
    serverurl:islocalhost?'http://localhost:3005':'http://znapi.i2u.top/',
    requesttimeout:5000,
    intervalrequestnearbydriver:5000
};

export default config;
