import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";



import NavbarItem from "./NavBarItem";


export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      <NavbarItem path="/my-notebooks" linkText="My notebooks" />
      <NavbarItem path="/fellow-students" linkText="Fellow students" />
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
