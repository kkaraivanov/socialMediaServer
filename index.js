require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const colors = require("colors");
const env = process.env.NODE_ENV || 'development';
const common = require('./src/config/common')
const connectDB = require('./src/config/database');
const corsOptions = require('./src/config/corsOptions');
const io = require('./src/services/ws/socketService')();
const { checkAcceptCookie } = require('./src/middlewares/acceptCookies');
const { guards } = require('./src/middlewares/guards');

connectDB();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// routes
app.use('*', guards.apiKey, (req, res, next) => {
    req.ios = io;
    next();
})
app.use('/api', checkAcceptCookie, require('./src/routes/init'));
app.use('/api/auth', require('./src/routes/authorize'));

const config = common[env];
const server = app.listen(config.port, err => {
    if (err) {
        console.info(`${err}`.red.bold);
        return;
    };
    
    console.log(`Server listening on port ${config.port}...`.cyan);
});

io.listen(server)
