if (process.env.NODE_ENV === 'production') {
    module.exports = require('./login.prod');
} else {
    module.exports = require('./login.dev');
}