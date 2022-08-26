const allowedOrigins = require('./allowedOrigins');
const allowedMethods = require('./allowedMethods');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('Origin is not allowed!')
        }
    },
    credentials: true,
    methods: allowedMethods,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;