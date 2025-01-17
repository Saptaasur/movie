import Bookings from "../models/Bookings.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req,res,next) => {
    let users
    try {
        users = await User.find()
    } catch (error) {
        console.log(err)
    }
    if(!users){
        return res.status(500).json({message: "Unexpected Error occurred"})
    }
    return res.status(200).json({users})
}

export const signUp = async(req,res,next) =>{
    const {name,email,password} = req.body
    if(!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === ""){
        return res.status(422).json({message: "Invalid Inputs"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user;
    try {
        user = new User({name, email, password: hashedPassword})
        user = await user.save()
    } catch (error) {
        console.log(error)
        
    }
    if(!user){
        return res.status(500).json({message: "Unexpected Error occurred"})
    }
    return res.status(201).json({id:user._id})
}

export const updateUser = async(req,res,next) => {
    const id = req.params.id
    const {name,email,password} = req.body
    if(!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === ""){
        return res.status(422).json({message: "Invalid Inputs"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    let user
    try {
        user = await User.findByIdAndUpdate(id,{name, email, password: hashedPassword})
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    res.status(200).json({message:"Updated Successfully"})
}

export const deleteUser = async(req,res,next) =>{
    const id = req.params.id
    let user;
    try {
        user = await User.findByIdAndDelete(id)
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message:"User Not found"})
    }
    res.status(200).json({message:"Deleted Successfully"})
}

export const login = async(req,res,next) =>{
    const {email,password} = req.body
    if(!email && email.trim() === "" && !password && password.trim() === ""){
        return res.status(422).json({message: "Invalid Inputs"})
    }
    let existingUser
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message:"Unable to find User with this Id"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Password Incorrect"})
    }
    const token = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY,{expiresIn:"1d"})
    res.status(200).json({message: "Successfully Logged In",token,id:existingAdmin._id})
}
export const getBookingsOfUser = async(req,res,next) =>{
    const id = req.params.id
    let bookings
    try {
      bookings = await Bookings.find({user: id})
    } catch (error) {
      return console.log(error)
    }
    if(!bookings){
      return res.status(500).json({message:"Unable to fetch Bookings"})
    }
    return res.status(200).json({bookings})
  }