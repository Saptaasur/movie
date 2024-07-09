import React from 'react'
import {useDispatch}from 'react-redux'
import AuthForm from './AuthForm.js'
import { sendAdminAuthRequest } from '../api-helpers/api-helpers.js'
import { adminActions} from '../store/store.js'

const Admin = () => {
  const dispatch = useDispatch()
  const onResReceived = (data) => {
    console.log(data)
    dispatch(adminActions.login())
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
  }
  const getData = (data) => {
    console.log("Admin",data)
    sendAdminAuthRequest(data.inputs).then(onResReceived).catch(error => console.log(error))
  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} isAuth={false}/>
    </div>
  )
}

export default Admin