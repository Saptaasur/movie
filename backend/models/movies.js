import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    actors:[{type:String,required: true}],
    releaseDate:{
        type: Date,
        required:true
    },
    postedUrl:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    bookings:[{type:mongoose.Types.ObjectId, ref:"Booking"}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        required:true
    }
},{timestamps:true})

export default mongoose.model('Movie', movieSchema);
