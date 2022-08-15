const router = require('express').Router();
const cors = require('cors');
const { corsOption } = require('../../config/config')
const options = {
    origin: (origin, callback) => {
        if (corsOption.origins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('Origin is not allowed!')
        }
    },
    methods: corsOption.methods,
    allowedHeaders: corsOption.headers
};

const userController = require('./users/userController')

// set cors for route access
router.use(cors(options))

// TODO set users controllers route '/users'
router.use('/users', userController);

// TODO set user data controllers route '/data'

module.exports = router