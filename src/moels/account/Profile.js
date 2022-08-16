const { model, Schema, Types: { ObjectId } } = require('mongoose');

const profileSchema = new Schema({
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
    _userId: {
        type: ObjectId,
        ref: 'User'
    }
})

exports.Profile = model('Profile', profileSchema);