const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type:String,
            required:true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minlength: [3, 'last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,    //if we find user then password will not show
    },
    socketid: {
        type: String,
    }, 
})

userSchema.methods.generateAuthToken = function () {    //generate token for login 
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET , { expiresIn: '24h' })
    return token;
} 

userSchema.methods.comparePassword = async function (password) {   //compare password 
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {   //hash password 
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);  //create model

module.exports = userModel;