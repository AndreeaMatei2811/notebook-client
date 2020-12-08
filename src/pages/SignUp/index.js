import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(firstName, lastName, username, email, password));

    set_firstName("");
    set_lastName("");
    set_username("");
    set_email("");
    set_password("");
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(event) => set_firstName(event.target.value)}
            type="text"
            placeholder="Enter first name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => set_lastName(event.target.value)}
            type="text"
            placeholder="Enter last name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>user name</Form.Label>
          <Form.Control
            value={username}
            onChange={(event) => set_username(event.target.value)}
            type="text"
            placeholder="Enter user name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => set_email(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => set_password(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
