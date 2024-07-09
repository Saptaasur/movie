import express from 'express'
import mongoose from 'mongoose'
import 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import movieRouter from './routes/movieRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO).then(()=> {
    console.log('Connected to MongoDB'.inverse.yellow)
}).catch((err)=>{
    console.log(err)
})



app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/movie', movieRouter)
app.use("/booking", bookingRouter)

app.listen(4000,()=>{
    console.log(' Server Burning at Port 4000 '.white.inverse)
})