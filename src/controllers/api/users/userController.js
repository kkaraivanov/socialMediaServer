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

// register method 'POST'
router.post('/register', bodyDataValidate, async (req, res) => {
    try {
        const {email, password} = req.body
        await service.register(email, password);
        // I am considering  what object to return to the user --> jwt + user data
        res.status(201).json('You is registered... COOL!!!')
    } catch (error) {
        console.info(`Register Error: ${error.message}`)
        res.status(409).json({ message: error.message });
    }
    
})
//TODO set edit method 'PUT/PACH'

//TODO set delete method 'DELETE'

// login method 'POST'
router.post('/login', bodyDataValidate, (req, res) => {
    res.status(200).json('You is loged in... COOL!!!')
})
//TODO set logout method 'GET'


module.exports = router