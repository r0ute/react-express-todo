const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    }
});

module.exports = mongoose.model('UserSchema', UserSchema);