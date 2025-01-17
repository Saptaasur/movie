import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
        
    },
    addedMovies:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Movie"
        }
    ]
},{timestamps:true})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;