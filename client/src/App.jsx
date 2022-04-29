import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store.js";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/log" element={<Login />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
