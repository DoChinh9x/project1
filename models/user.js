const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        min:6,
        max: 256
    },
    email:{
        type: String,
        require: true,
        min:6,
        max: 256
    },
    password:{
        type: String,
        require: true,
        min:6,
        max: 1024
    },
    admin:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    },   
},
    {timestamps: true}
);

module.exports = mongoose.model('userSchema',userSchema)