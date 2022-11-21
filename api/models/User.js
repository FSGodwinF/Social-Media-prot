const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        minLength: 3,
        maxLength: 255,
        unique: true
    }, 
    password: {
        type: String,
        require: true,
        minLength: 6, 
        maxLength: 255
    }, 
    profilePicture: {
        type: String, 
        default: ""
    },
    coverPicture: {
        type: String, 
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        maxLength: 50
    },
    city: {
        type: String,
        maxLength: 90
    },
    from:{
        type: String, 
        maxLength: 50
    },
    relationship:{
        type: Number,
        enum:[1,2,3] 
    }


},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);