import jwt from "jsonwebtoken";
import Movie from "../models/movies.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

export const addMovie = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;
  jwt.verify(extractedToken, process.env.SECRET_KEY, (error, decrypted) => {
    if (error) {
      return res.status(400).json({ message: `${error.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  const { title, description, releaseDate, postedUrl, featured, actors } =
    req.body;
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !postedUrl ||
    postedUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      postedUrl,
      actors,
      admin:adminId
    });
    const session = await mongoose.startSession()
    const adminUser = await Admin.findById(adminId)
    session.startTransaction()
    await movie.save({session});
    adminUser.addedMovies.push(movie)
    await adminUser.save({session})
    await session.commitTransaction()
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(201).json(movie);
};

export const getAllMovies = async(req,res,next) =>{
  let movies;
  try {
    movies = await Movie.find()
  } catch (error) {
    return console.log(error)
  }
  if(!movies){
    return res.status(500).json({message:"Request failed"})
  }
  return res.status(200).json({movies})
}

export const getMovieById = async(req,res,next)=>{
  const id = req.params.id
  let movie
  try {
    movie = await Movie.findById(id)
  } catch (error) {
    return console.log(error)
  }
  if(!movie){
    return res.status(404).json({message: "Invalid Movie ID"})
  }
  return res.status(200).json({movie})
}