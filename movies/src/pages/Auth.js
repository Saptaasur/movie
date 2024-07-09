import React from "react";
import AuthForm from "./AuthForm.js";
import { sendUserAuthRequest } from "../api-helpers/api-helpers.js";
import { userActions } from "../store/store.js";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch()
  const onResReceived = (data) => {
    console.log(data)
    dispatch(userActions.login())
    localStorage.setItem("userId", data.id)
  }
  const getData = (data) => {
    console.log("Auth",data);
    sendUserAuthRequest(data.inputs, data.signUp).then(onResReceived).catch((error) => console.log(error));
    
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} isAuth={true} />
    </div>
  );
};

export default Auth;
