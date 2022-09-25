const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../controllers/userController');
const validator = require('../middlewares/validator');

// body validators
const registerDataValidate = [
    body('username').isLength({ min: 3, max: 20 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 12 }), 
    function(req, res, next) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const message = errors
                .array()
                .map(x => `${x.msg.split(' ')[0]}: ${x.param}`)
                .join('\r\n')
            return res.status(400).json({ message });
        }

        next()
    }
];

const loginDataValidate = [
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 12 }), 
    function(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const message = errors
                .array()
                .map(x => `${x.msg.split(' ')[0]}: ${x.param}`)
                .join('\r\n')
            return res.status(400).json({ message });
        }

        next()
    }
];

router.post('/register', registerDataValidate, register);
router.post('/login', loginDataValidate, login);
router.get('/logout', validator, logout);

module.exports = router