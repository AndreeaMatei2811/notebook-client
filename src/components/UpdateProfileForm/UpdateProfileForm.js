import React, { useState } from "react";

import { Button, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postProfilePic } from "../../store/user/actions";
import { updatePassword, updateProfile } from "../../store/user/actions";

export default function UpdateProfileForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const dispatch = useDispatch();

  //   console.log("first name", firstName);
  //   console.log("lastName", lastName);
  //   console.log("userName", username);

  const hiddenFileInput = React.useRef(null);

  const handleImgClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "notebookapp");

    dispatch(postProfilePic(data));
  };

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateProfile(username, firstName, lastName, email));
    setEditForm(false);
  }

  function submitNewPassword(event) {
    event.preventDefault();
    dispatch(updatePassword(password));
    setEditPassword(false);
  }

  return (
    <div>
      <Button
        onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
      >
        Update profile
      </Button>
      <div>
        <Button
          className="mt-2"
          onClick={(e) =>
            editPassword ? setEditPassword(false) : setEditPassword(true)
          }
        >
          Change password
        </Button>
        {editForm ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Update profile</h1>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Enter new username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                type="text"
                placeholder="Enter new first name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                type="text"
                placeholder="Enter new last name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter new email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicImageUrl">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                type="text"
                placeholder="Image url"
              />
              <input
                accept="image/*"
                ref={hiddenFileInput}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <Button onClick={handleImgClick}>Change picture</Button>
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Submit changes
              </Button>
            </Form.Group>
          </Form>
        ) : null}
        {editPassword ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Change password</h1>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckPassword">
              <Form.Label>Password check</Form.Label>
              <Form.Control
                value={checkPassword}
                onChange={(event) => setCheckPassword(event.target.value)}
                type="password"
                placeholder="Retype password"
                required
              />
            </Form.Group>
            {!password ? (
              <p style={{ color: "red" }}>Please enter a new password.</p>
            ) : password === checkPassword ? (
              <Form.Group className="mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitNewPassword}
                >
                  Change password
                </Button>
              </Form.Group>
            ) : (
              <p style={{ color: "red" }}>
                The passwords don't match. Please check again.
              </p>
            )}
          </Form>
        ) : null}
      </div>
    </div>
  );
}
