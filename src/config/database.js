const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,{
            autoIndex: false,
            serverSelectionTimeoutMS: 5000
        });
    } catch (err) {
        process.emit(1)
        throw {
            error: {
                code: err.code
            }
        }
    }
}

module.exports = connectDB