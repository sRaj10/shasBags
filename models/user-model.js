const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname : {
        type:String,
        minLength:2,
        trim:true
    },
    email : String,
    password:String,
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'poducts', default: [] },

    orders:{    
        type: Array,
        default:[]
    },
    contact:Number,
    picture:String
})

module.exports = mongoose.model("user",userSchema);