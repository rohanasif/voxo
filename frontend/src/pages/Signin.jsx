import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <Form className="d-flex flex-column vh-100 align-items-center justify-content-center">
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
      <Form.Text className="text-muted mt-3">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Sign up!
        </Link>
      </Form.Text>
    </Form>
  );
}

export default Signin;
