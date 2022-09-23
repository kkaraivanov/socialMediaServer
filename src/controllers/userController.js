const service = require('../services/userService');

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

}

module.exports.logout = async (req, res, next) => {

}