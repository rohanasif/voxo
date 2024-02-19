import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../slice/apiSlice";

function NavBar() {
  const [signout, signoutResponse] = useSignOutMutation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const handleClick = () => {
    if (token) {
      signout(token);
      localStorage.removeItem("token");
    }
    navigate("/signin");
  };
  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Voxo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-around flex-grow-1">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/product1">
                Product 1
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product2">
                Product 2
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product3">
                Product 3
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/signup" hidden={token}>
              Sign Up
            </Nav.Link>
            <Nav.Link onClick={handleClick}>
              {token ? "Signout" : "Signin"}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
