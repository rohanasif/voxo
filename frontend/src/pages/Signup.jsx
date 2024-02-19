import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "../slice/apiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  localStorage.removeItem("token");
  const [signup, signupResponse] = useSignUpMutation();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, error, data } = signupResponse;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("token", JSON.stringify(data?.token));
      navigate("/signin");
    }
  }, [isSuccess, navigate, data?.token]);

  return (
    <Form
      className="d-flex flex-column vh-100 align-items-center justify-content-center"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          name="name"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isLoading ? "Loading..." : "Sign up"}
      </Button>
      <Form.Text className="text-muted mt-3">
        Already registered?{" "}
        <Link to="/signin" className="text-decoration-none">
          Sign in!
        </Link>
      </Form.Text>
      {isError && (
        <Form.Text className="mt-3 text-danger">{error.data.message}</Form.Text>
      )}
    </Form>
  );
}

export default Signup;
