const { Token } = require('../models/Token');
const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return jwt.sign({
        id: user._id,
        roles: user.roles
    }, process.env.JWT_TOKEN_KEY)
}

const createToken = async (user) => {
    try {
        return await Token.create({ _userId: user._id });
    } catch (error) {
        throw { status: 500 }
    }
}

const getByTokenString = async (token) => {
    try {
        return await Token.findOne({ token }).exec();
    } catch (error) {
        throw { status: 500 }
    }
}

const getByUserId = async (id) => {
    try {
        return await Token.findOne({ _userId: id }).exec();
    } catch (error) {
        throw { status: 500 }
    }
}

module.exports.token = {
    createToken,
    generateJWT,
    getByTokenString,
    getByUserId
}