const { User } = require('../../models/account/User');

async function create(email, password) {
    try {
        const user = await User.create({email, password, progileImg: 'Test'});

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

async function getOne(email, password) {
    const user = await User.findOne({ email: email }).exec();
    
    if (user == null) {
        throw {
            statusCode: 404,
            message: 'Invalid email or password!'
        }
    }

    if (user.isDeleted) {
        throw {
            statusCode: 404,
            message: 'Invalid user!'
        }
    }

    const passwordIsMatches = await user.checkPasswor(password);

    if (!passwordIsMatches) {
        throw {
            statusCode: 404,
            message: 'Invalid email or password!'
        }
    }

    return user;
}

module.exports = {
    create,
    getOne
}