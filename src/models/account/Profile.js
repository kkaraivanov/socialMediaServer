const { model, Schema, Types: { ObjectId } } = require('mongoose');

const profileSchema = new Schema({
    _userId: {
        type: ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    sity: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
})

exports.Profile = model('Profile', profileSchema);