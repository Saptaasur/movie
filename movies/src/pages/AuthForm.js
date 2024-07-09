import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";

const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({onSubmit,isAdmin,isAuth}) => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({inputs,signup: isAdmin?false : signUp})
    navigate('/')
  };

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: 30 } }}
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {signUp ? "Sign-Up" : "Log-in"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={300}
          margin={"auto"}
          alignContent={"center"}
        >
          {!isAdmin && signUp && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type="text"
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type="email"
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type="password"
            name="password"
          />
          <Button
            type="submit"
            sx={{ mt: 1, borderRadius: 10, bgcolor: "#2b2d42" }}
            fullWidth
            variant="contained"
          >
            {signUp ? "Sign Up" : "Login"}
          </Button>
          {isAuth && !isAdmin &&(<Typography
            sx={{ mt: 1.5 }}
            justifyContent={"center"}
            alignContent={"center"}
            display={"flex"}
          >
            Or
          </Typography>)}
          { !isAdmin && (<Button
            onClick={() => setSignUp(!signUp)}
            sx={{ mt: 1, borderRadius: 10 }}
            fullWidth
            variant="contained"
          >
            {signUp ? "Login" : "Sign Up"}
          </Button>)}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;