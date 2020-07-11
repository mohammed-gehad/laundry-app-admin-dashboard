import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../api/server";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
