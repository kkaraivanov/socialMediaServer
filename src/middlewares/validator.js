const jwt = require('jsonwebtoken');
const { token } = require('../services/tokenService');

const validator = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const cookiesToken = cookies?.jwt;
    const oldToken = await token.getByTokenString(cookiesToken);
    if (!oldToken) return res.sendStatus(403);

    jwt.verify(
        cookiesToken,
        process.env.JWT_TOKEN_KEY,
        async (err, user) => {
            if (err) return res.sendStatus(403);
            const faindUser = await token.getByUserId(user.id);
            if(!faindUser) return res.sendStatus(403);
            
            if (String(oldToken.token) !== cookiesToken) {
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                faindUser.token = '';
                await faindUser.save();
                return res.sendStatus(403);
            }

            req.userId = user.id;
            next();
        }
    );
}

module.exports = validator