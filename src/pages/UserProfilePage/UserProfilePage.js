import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateProfileForm from "../../components/UpdateProfileForm/UpdateProfileForm";
import { selectUser } from "../../store/user/selectors";

export default function UserProfilePage() {
  const user = useSelector(selectUser);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <h3>Your Profile</h3>
      <div>
        <div>
          <img
            src={user.imageUrl}
            alt="profile img"
            style={{ width: 100, height: 110 }}
          />
        </div>
        <div>
          <table style={{ width: "30rem" }}>
            <thead>
              <tr>
                <th>Your information</th>
              </tr>
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
        </div>
      </div>
      <UpdateProfileForm />
    </div>
  );
}
