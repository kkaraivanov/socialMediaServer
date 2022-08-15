const mongoose = require('mongoose');
const { db } = require('./config')

async function connect() {
    try {
        await mongoose.connect(db.url, db.options);
        console.info('MongoDb is connected...');
    } catch (error) {
        throw {
            error: {
                code: error.code,
                codeName: error.codeName
            }
        }
    }
}

module.exports = {
    connect
}