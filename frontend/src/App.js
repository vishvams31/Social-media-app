import Home from "./views/home/Home";
import { Toaster } from 'react-hot-toast';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom"
import { useEffect } from "react";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Profile from "./views/profile/Profile";
// import EditPostPage from "./pages/editPostPage/EditPostPage";
import { loginSuccess } from '../src/actions/AuthAction'
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token')
    const authUser = {
      user: user, token: token
    }
    // console.log(authUser)
    if (user && token) {
      dispatch(loginSuccess(authUser));
    }
  }, [dispatch]);

  const user = useSelector(state => state.auth.user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Register />}></Route>
          <Route exact path='/login' element={user ? <Navigate replace to="/" /> : <Login />}></Route>
          <Route exact path='/register' element={user ? <Navigate replace to="/" /> : <Register />}></Route>
          <Route exact path='/profile/:username' element={<Profile />}></Route>
          {/* <Route path="/edit-post/:postId" component={EditPostPage} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
