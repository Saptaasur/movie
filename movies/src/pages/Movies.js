import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./MovieItem.js";

const Movies = () => {
  const [movie, setMovie] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovie(data.movies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant="h4"
        padding={2}
        width="40%"
        margin={"auto"}
        bgcolor={"red"}
        co
        textAlign={"center"}
        color={"white"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        marginTop={5}
        display={"flex"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
      >
        {movie &&
          movie.map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.title}
              postedUrl={movie.postedUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
