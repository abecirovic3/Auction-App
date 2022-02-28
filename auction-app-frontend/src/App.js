import Register from "./components/Register/Register"
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
        <ForgotPassword />
        <Login />
        <Register />
    </div>
  );
}

export default App;
