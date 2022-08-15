const router = require('express').Router();

const api = require('./api/index')
router.use('/api', api);

// TODO set ui routes


module.exports = router