const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: '{PATH} is required!'
    },
    tasks: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Tasks'}
    ]
})

module.exports = mongoose.model('User', UserSchema)