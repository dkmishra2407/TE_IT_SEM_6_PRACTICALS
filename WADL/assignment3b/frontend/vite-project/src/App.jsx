import React from "react"
import SignUp from "./pages/SignUp"
import SingIn from "./pages/SingIn"
import ShowDetails from "./pages/ShowDetails"
import Home from "./pages/Home"
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
// import './App.css'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/showdetails" element={<ShowDetails />} />
      </Routes>
  );
}

export default App;