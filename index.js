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
const assets = require('./src/middlewares/assets')
const staticPath = common.staticPath('./');

connectDB();

app.use(credentials);
//app.use(express.static(staticPath));
app.use(assets(staticPath));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// routes
app.use('/api', require('./src/routes/init'));

const config = common[env];
mongoose.connection.once('open', () => {
    console.log('MongoDb is connected...');
    app.listen(config.port, err => {
        if (err) {
            console.info(err);
            return;
        }

        console.info(`Server listening on port ${config.port}...`);
    });
});
