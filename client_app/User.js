var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
