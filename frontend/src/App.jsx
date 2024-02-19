import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
const App = () => {
  return (
    <div className="min-vh-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
