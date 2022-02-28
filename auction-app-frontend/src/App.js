import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div>
              <h1 style={{textAlign: "center"}}>Header</h1>
          </div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
