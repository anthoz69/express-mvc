const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)