import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../slice/apiSlice";
import { useEffect, useState } from "react";
import { signIn } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const dispatch = useDispatch();
  const [signin, signinResponse] = useSignInMutation();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, error, data } = signinResponse;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signin(formData);
    dispatch(signIn(formData.id));
  };

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    if (isSuccess) {
      localStorage.setItem("token", JSON.stringify(data?.token));
      navigate("/");
    }
  }, [data?.token, navigate, isSuccess, token]);

  return (
    <Form
      className="d-flex flex-column vh-100 align-items-center justify-content-center"
      onSubmit={handleSubmit}
    >
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
      <Button variant="primary" type="submit">
        {isLoading ? "Loading..." : "Sign in"}
      </Button>
      <Form.Text className="text-muted mt-3">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Sign up!
        </Link>
      </Form.Text>
      {isError && (
        <Form.Text className="mt-3 text-danger">{error.data.message}</Form.Text>
      )}
    </Form>
  );
}

export default Signin;
