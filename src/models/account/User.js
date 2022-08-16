const { model, Schema } = require('mongoose');
const { Profile } = require('./Profile');
const bcrypt = require('bcrypt');
const round = 11;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
        validate: {
            validator: function (v) {
                return this.model('User').findOne({ email: v })
                    .then(user => !user)
            },
            message: props => `Email ${props.value} is already used by another user. Use another email address.`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 5,
        max: 12
    },
    roles: {
        type: Array,
        default: ['user']
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

userSchema.pre('save', async function (next) {
    const [hashed, profile] = await Promise.all([
        bcrypt.hash(this.password, round),
        Profile.create({ _userId: this._id })
    ])

    if (profile == null) throw {
        message: `User ${this.email} is not created`
    }

    this.password = hashed;

    next();
});

const user = model('User', userSchema);

user.prototype.checkPasswor = async function (v) {
    return await bcrypt.compare(v, this.password);
}

exports.User = user