import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return <BrowserRouter>
  <Navbar/>
   <Routes>
     <Route path="/" index element={<Home/>} />
     <Route path="/log" element={<Login/>} />
   </Routes>
  
  </BrowserRouter>
}

export default App;
