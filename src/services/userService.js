const { User } = require('../models/account/User');

async function create(username, email, password) {
    try {
        const user = await User.create({ username, email, password });

        if (user == null) {
            throw {
                statusCode: 404,
                message: 'Sorry, register is not completed. Please try again later.'
            }
        }

        return user;
    } catch (error) {
        const errors = Object.values(error.errors).map(x => x.message)
        throw {
            message: errors.join('\r\n')
        }
    }
}

async function getUser(userObj) {
    const user = await User.findOne({ email: userObj.email }).exec();

    if (user == null) {
        throw {
            statusCode: 404,
            message: 'Incorrect email or password!'
        }
    }

    if (user.isDeleted) {
        throw {
            statusCode: 404,
            message: 'Invalid user!'
        }
    }

    const passwordIsMatches = await user.checkPasswor(userObj.password);

    if (!passwordIsMatches) {
        throw {
            statusCode: 404,
            message: 'Incorrect email or password!'
        }
    }

    return user;
}

module.exports = {
    create,
    getUser
}