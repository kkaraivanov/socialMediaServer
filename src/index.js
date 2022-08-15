const app = require('express')();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env]

async function start(){
    try {
        // TODO connect MongoDb
    } catch (error) {
        
    }

    app.listen(config.port, err => {
        if (err) {
            console.info(err);
            return;
        }
    
        console.info(`Server listening on port ${config.port}...`);
    });
}

start();