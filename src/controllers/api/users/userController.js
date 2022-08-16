const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const service = require('../../../services/account/userService');

// body validator
const bodyDataValidate = [
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
]
//TODO set all method 'GET' only for administrator role

//TODO set register method 'POST'
router.post('/register', bodyDataValidate, (req, res) => {
    res.status(200).json('You is registered... COOL!!!')
})
//TODO set edit method 'PUT/PACH'

//TODO set delete method 'DELETE'

//TODO set login method 'POST'

//TODO set logout method 'GET'


module.exports = router