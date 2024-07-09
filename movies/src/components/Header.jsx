import React from "react";
import {
  AppBar,
  Autocomplete,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../api-helpers/api-helpers.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/store.js";

const Header = () => {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);
  const logout = (isAdmin) =>{
    dispatch(isAdmin ? adminActions.logout(): userActions.logout())
  }
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <SlideshowIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search all movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movie" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="Auth" />
              </>
            )}
            {isUserLoggedIn && ( 
              <>
              <Tab LinkComponent={Link} to="/user" label="Profile" />
              <Tab LinkComponent={Link} to="/" label="Logout" onClick={()=> logout(false)}/>
            </>)
            }
            {isAdminLoggedIn &&( <>
              <Tab LinkComponent={Link} to="/add" label="Add Movie" />
              <Tab LinkComponent={Link} to="/admin" label="Profile" />
              <Tab LinkComponent={Link} to="/" label="Logout" onClick={()=> logout(true)}/>
            </>
          )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
