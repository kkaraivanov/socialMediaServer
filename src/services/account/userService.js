const { User } = require('../../moels/account/User');

async function register(email, password) {
    try {
        const user = await User.create({email, password});

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