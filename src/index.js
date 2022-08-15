const app = require('express')();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env]
const db = require('./config/database')

async function start(){
    try {
        await db.connect();
    } catch (error) {
        console.info('The database is not available: ', error);
        return process.exit(1);
    }

    // TODO use dependency
    app.listen(config.port, err => {
        if (err) {
            console.info(err);
            return;
        }
    
        console.info(`Server listening on port ${config.port}...`);
    });
}

start();