const service = require('../services/userService');
const { token } = require('../services/tokenService');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await service.create(username, email, password);

        return res.status(201).json({
            success: true,
            message: 'New user is created!',
            user
        })
    } catch (error) {
        const statusCode = error.statusCode || 409;
        res.status(statusCode).json({ message: error.message });
        next(error.message);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const user = await service.getUser(req.body);
        let userToken = await token.getByUserId(user);

        if (!userToken) {
            userToken = await token.createToken(user);
        }

        const cookies = req.cookies;
        if (cookies?.jwt) {
            userToken.token = '';

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        const accessToken = token.generateJWT(user);
        userToken.token = accessToken;
        await userToken.save();

        res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        const {
            __v,
            password,
            isDeleted,
            createdAt,
            updatedAt,
            ...userData
        } = user._doc;
        return res.status(200).json({
            ...userData,
            //token: accessToken
        })
    } catch (error) {
        const statusCode = error.statusCode || 401;
        const message = { message: statusCode == 401 ? 'Unauthorized' : error.message }
        res.status(statusCode).json(message);
        next(error.message);
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);
        const cookiesToken = cookies.jwt;
        const foundToken = await token.getByTokenString(cookiesToken);
        
        if (!foundToken) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        foundToken.token = '';;
        await foundToken.save();

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}