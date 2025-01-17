import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react";
import { Link } from 'react-router-dom';


const MovieItem = ({title,releaseDate,postedUrl,id}) => {
   
  return (
    <Card sx={{margin:3, width: 240, height:320, borderRadius: 5,":hover":{boxShadow:"10px 10px 20px #ccc"} }}>
      <img height="50%" width="100%" src={postedUrl} alt={title}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:'auto'}} size="small">
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
