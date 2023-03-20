const mong = require('mongoose');

const UserSchema = new mong.Schema({
    name: String
});

module.exports = mong.model('User', UserSchema);