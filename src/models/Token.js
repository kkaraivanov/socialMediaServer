const { model, Schema, Types: { ObjectId } } = require('mongoose');

const tokenSchema = new Schema({
    _userId: {
        type: ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
        required: [false]
    }, 
    
})

exports.Token = model('Token', tokenSchema);