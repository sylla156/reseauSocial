import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store.js";
import Router from './Router/Router' ;
import "./App.scss";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Router/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
