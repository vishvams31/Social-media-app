import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route

} from "react-router-dom"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/profile/:username' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
