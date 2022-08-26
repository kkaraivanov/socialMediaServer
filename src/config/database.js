const mongoose = require('mongoose');
const { db } = require('./configDb')

const connectDB = async () => {
    try {
        await mongoose.connect(db.url, db.options);
    } catch (err) {
        throw {
            error: {
                code: error.code,
                codeName: error.codeName
            }
        }
    }
}

module.exports = connectDB