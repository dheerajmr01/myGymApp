const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup methodd

userSchema.statics.signup = async function(email, password) {
    
    //validation
    if (!email || !password) { 
        throw Error("Invalid email or password(Cannot be empty)");
    } 
    if (!validator.isEmail(email)) { 
        throw Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Invalid password");
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already exists')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    

    return user
}

//static login method

userSchema.statics.login = async function (email, password) { 
    if (!email || !password) { 
        throw Error("Invalid email or password(Cannot be empty)");
    } 

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email incorrect!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Invalid password"); 
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)