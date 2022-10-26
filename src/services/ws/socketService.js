const { Server } = require('socket.io');
const corsOptions = require('../../config/corsOptions');

module.exports = () => new Server({
    cors: corsOptions,
    origins: process.env.ORIGINS

});

module.exports.ws = {
    connectTo: (io, namespace) => io.of(namespace)
}
