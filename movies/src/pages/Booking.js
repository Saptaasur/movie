import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api-helpers/api-helpers.js";
import { newBooking } from "../api-helpers/api-helpers.js";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((error) => console.log(error));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    const userId = "userId";
    newBooking({ ...inputs, movie: movie._id, user: userId })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily={"fantasy"}
            variant="h4"
            textAlign={"center"}
          >
            Book tickets of Movie {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection={"column"}
              padding={3}
              width={"50%"}
            >
              <img
                src={movie.postedUrl}
                alt={movie.title}
                width={"80%"}
                height={"300px"}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starting: {movie.actors.map((actor) => actor + ",")}
                </Typography>
                <Typography fontWeight={"bold"}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number:</FormLabel>
                  <TextField
                    name="seatNumber"
                    type={"number"}
                    margin="normal"
                    variant="standard"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                  />
                  <FormLabel>Booking date:</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now!
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
