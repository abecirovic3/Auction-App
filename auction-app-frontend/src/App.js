import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
