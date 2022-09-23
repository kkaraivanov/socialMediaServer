require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const env = process.env.NODE_ENV || 'development';
const common = require('./src/config/common')
const connectDB = require('./src/config/database');
const credentials = require('./src/middlewares/credentials');
const corsOptions = require('./src/config/corsOptions');
const { checkAcceptCookie } = require('./src/middlewares/acceptCookies');

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// routes
app.use('/api', checkAcceptCookie, require('./src/routes/init'));

const config = common[env];
const server = app.listen(config.port, err => {
    if (err) {
        console.info(err);
        return;
    };

    mongoose.connection.once('open', () => {
        console.log('Connection to MongoDb is opened!');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDb is disconnected!');
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDb...');
    });

    console.info(`Server listening on port ${config.port}...`);
});
