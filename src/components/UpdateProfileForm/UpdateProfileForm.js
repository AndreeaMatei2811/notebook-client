import React, { useState } from "react";

import {
  FormControl,
  Input,
  InputLabel,
  Typography,
  Button,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { postProfilePic } from "../../store/user/actions";
import { updatePassword, updateProfile } from "../../store/user/actions";

export default function UpdateProfileForm() {
  const user = useSelector(selectUser);
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
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
    setEditForm(false);
  };

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateProfile(username, firstName, lastName, email));
    setEditForm(false);
  }

  function submitNewPassword(event) {
    event.preventDefault();
    dispatch(updatePassword(password));
    setChangePassword(false);
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        style={{ marginBottom: 30, marginTop: 20 }}
        onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
      >
        Update profile
      </Button>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) =>
            changePassword ? setChangePassword(false) : setChangePassword(true)
          }
        >
          Change password
        </Button>
        {editForm ? (
          <Form style={{ marginBottom: 30, marginTop: 20 }}>
            <Typography variant="h4">Update profile</Typography>
            <FormGroup>
              <FormControl controlId="formBasicUsername" className="mt-5">
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  placeholder="Enter new username"
                />
              </FormControl>
              <FormControl controlId="formBasicFirstName" className="mt-5">
                <FormLabel>First name</FormLabel>
                <Input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  type="text"
                  placeholder="Enter new first name"
                />
              </FormControl>

              <FormControl controlId="formBasicLastName" className="mt-5">
                <FormLabel>Last name</FormLabel>
                <Input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  type="text"
                  placeholder="Enter new last name"
                />
              </FormControl>

              <FormControl controlId="formBasicEmail" className="mt-5">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter new email"
                  required
                />
              </FormControl>

              <FormControl controlId="formBasicImageUrl" className="mt-5">
                <FormLabel>Profile picture</FormLabel>
                <input
                  accept="image/*"
                  ref={hiddenFileInput}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <Button
                  onClick={handleImgClick}
                  color="primary"
                  variant="contained"
                >
                  Change picture
                </Button>
              </FormControl>
            </FormGroup>
            <FormGroup className="mt-5">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={submitForm}
              >
                Submit changes
              </Button>
            </FormGroup>
          </Form>
        ) : null}
        {changePassword ? (
          <Form md={{ span: 6, offset: 3 }} className="mt-5">
            <Typography variant="h4">Change password</Typography>
            <FormGroup>
              <FormControl controlId="formBasicPassword" className="mt-5">
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
              </FormControl>

              <FormControl controlId="formBasicCheckPassword" className="mt-5">
                <FormLabel>Password check</FormLabel>
                <Input
                  value={checkPassword}
                  onChange={(event) => setCheckPassword(event.target.value)}
                  type="password"
                  placeholder="Retype password"
                  required
                />{" "}
              </FormControl>
            </FormGroup>
            {!password ? (
              <div>
                <p style={{ color: "red" }}>Please enter a new password.</p>
                <FormGroup className="mt-5">
                  <Button
                    disabled
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={submitNewPassword}
                    style={{ marginBottom: 200 }}
                  >
                    Change password
                  </Button>
                </FormGroup>{" "}
              </div>
            ) : password === checkPassword ? (
              <div>
                <p style={{ color: "green" }}>The passwords match!</p>
                <FormGroup className="mt-5">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={submitNewPassword}
                    style={{ marginBottom: 100 }}
                  >
                    Change password
                  </Button>
                </FormGroup>
              </div>
            ) : (
              <div>
                <p style={{ color: "red" }}>
                  The passwords don't match. Please check again.
                </p>
                <FormGroup className="mt-5">
                  <Button
                    disabled
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={submitNewPassword}
                    style={{ marginBottom: 200 }}
                  >
                    Change password
                  </Button>
                </FormGroup>
              </div>
            )}
          </Form>
        ) : null}
      </div>
    </div>
  );
}
