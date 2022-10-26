const path = require('path');
const PORT = Number(process.env.PORT);
const port = 5000;

module.exports = {
    development: { port },
    production: { port: PORT },
    staticPath: (to) => path.resolve(to, 'public')
}