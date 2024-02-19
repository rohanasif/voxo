import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <Form className="d-flex flex-column vh-100 align-items-center justify-content-center">
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="email" placeholder="Enter name" name="name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign up
      </Button>
      <Form.Text className="text-muted mt-3">
        Already registered?{" "}
        <Link to="/signin" className="text-decoration-none">
          Sign in!
        </Link>
      </Form.Text>
    </Form>
  );
}

export default Signup;
