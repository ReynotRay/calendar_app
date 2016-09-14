var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

//User Schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }, 
    email:{
        type: String
    },
    name:{
        type:String
    }
});




userSchema.methods.isPasswordValid = function(password) {
    if (password === this.password) {
        return true;
    }

    return false;
};

module.exports = mongoose.model('User', userSchema);
