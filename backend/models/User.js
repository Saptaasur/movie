import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        minLength: 6
    },
    bookings:[{type: mongoose.Types.ObjectId, ref:"Booking"}]
},{timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;