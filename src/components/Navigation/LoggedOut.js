import React from "react";
import NavbarItem from "./NavBarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
