import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from '../pages/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'

const Homepage = () => {
   const [movie, setMovie] = useState()
   useEffect(() =>{
    getAllMovies().then((data)=>setMovie(data.movies))
    .catch((error)=>console.log(error))
   },[])
  return (
    <Box width ={"100%"} height="100%" margin="auto" marginTop={2}>
       <Box width ={"40%"} height="80%" margin="auto" padding={2}>
          <img  src='https://tse3.mm.bing.net/th?id=OIP.qltrpC2ZyeQBWNLPxbn5mwHaEK&pid=Api&P=0&h=180' alt='Sholay' width ={"80%"} height="100%"/>
       </Box>
       <Box padding={5} margin={"auto"}>
        <Typography variant='h4' textAlign={'center'}>Latest Releases</Typography>
       </Box>
       <Box display="flex" width="80%" justifyContent={"center"} flexWrap={"wrap"}>
          {movie && movie.slice(0,4).map((movie,index)=>(<MovieItem id={movie.id} title={movie.title} postedUrl={movie.postedUrl} releaseDate={movie.releaseDate} key={index}/>))}
       </Box>
       <Box display={"flex"} padding={5} margin="auto">
         <Button LinkComponent={Link} to="/movie"  variant='outlined' sx={{margin:'auto', color:'2b2d42',}}> View all movies</Button>
       </Box>
    </Box>
  )
}

export default Homepage