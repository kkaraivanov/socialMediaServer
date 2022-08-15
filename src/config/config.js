const path = require('path'),
    PORT = process.env.PORT,
    port = 5000,
    defaultStaticPath = path.resolve('../', 'public');

module.exports = {
    development: { port },
    production: { port: PORT },
}

module.exports.static = {
    path: defaultStaticPath
}