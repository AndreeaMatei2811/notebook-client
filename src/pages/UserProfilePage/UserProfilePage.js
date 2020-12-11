import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateProfileForm from "../../components/UpdateProfileForm/UpdateProfileForm";
import { selectUser } from "../../store/user/selectors";
import "./UserProfile.scss";
import { Typography, Avatar } from "@material-ui/core";

export default function UserProfilePage() {
  const user = useSelector(selectUser);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="my-profile">
      <Typography variant="h3">{user.firstName} Profile</Typography>
      <div>
        <div>
          <Avatar
            className="mt-3"
            src={user.imageUrl}
            alt="profile img"
            style={{ width: 150, height: 160 }}
          />
        </div>
        <div className="mt-4">
          <table style={{ width: "30rem" }}>
            <thead>
              {/* <tr>
                <th>Your information</th>
              </tr> */}
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>First name</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td>Email address</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
          <UpdateProfileForm />
        </div>
      </div>
    </div>
  );
}
