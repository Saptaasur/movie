import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Movies from './pages/Movies';
import Homepage from './components/Homepage';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store/store';
import Booking from './pages/Booking';
import UserProfile from './pages/UserProfile';

function App() {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state)=> state.user.isLoggedIn)
  console.log("isAdminLoggedIn", isAdminLoggedIn)
  console.log("isUserLoggedIn", isUserLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }
  },[])
  return (
    <>
    <Header/>
    <section>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/movie" element={<Movies/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/booking/:id' element={<Booking/>}/>
      </Routes>
    </section>
    </>
  );
}

export default App;
