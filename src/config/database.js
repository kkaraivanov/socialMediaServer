const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URL, {
            autoIndex: false,
            serverSelectionTimeoutMS: 5000
        });

        console.info(`Connected to MongoDb: ${db.connection.host}`.cyan);
    } catch (err) {
        process.emit(1);
        console.log(`Error: ${error.message}`.red.bold);
        throw {
            error: {
                code: err.code
            }
        }
    }
}

module.exports = connectDB