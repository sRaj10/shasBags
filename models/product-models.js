
const { default: mongoose, disconnect } = require("mongoose");

const productSchema = mongoose.Schema({
     image: Buffer ,name:String,price:Number,discount:{type:Number,default:0},
     bgcolor:{
          type:String,
          default:'white'
     },
     panelcolor:  { type:String,
     default:
          'white'},
     textcolor:   {type:String,
          default:'white'}
})






module.exports= mongoose.model('poducts',productSchema)