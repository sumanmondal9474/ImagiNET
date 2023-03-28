const { Timestamp } = require("bson")
const mongoose= require("mongoose")

const loginSchema= new mongoose.Schema({
    name: {type:String,required:true,trim:true}, 
    email: {type:String, required:true},
    mobile: {type:Number, required:true}
},{timestamps:true})

module.exports = mongoose.model('login',loginSchema)