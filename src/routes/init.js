const router = require('express').Router();
//const maxAge = 365 * 24 * 60 * 60;
const maxAge = 1 * 1 * 30 * 60;

router.get('/', (req, res) => {
    const request = {
        allowSesion: true,
        acceptCookie: req.acceptCookie.status
    };

    if (!req.cookies?.jwt) request.jwt = false;

    res.status(200).json(request);
});

router.post('/', (req, res) => {
    const { value } = req.body;
    const request = {
        acceptCookie: false
    };

    if (!req.acceptCookie.status) {
        request.acceptCookie = true;

        if (value == 1) {
            res.cookie("accept-cookies", 1, {
                withCredentials: true,
                httpOnly: false,
                sameSite: 'lax',
                maxAge: maxAge * 1000,
            });
        }
    }

    res.status(200).json(request);
});

module.exports = router