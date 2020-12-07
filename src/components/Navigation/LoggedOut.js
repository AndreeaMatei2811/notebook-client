import React from "react";
import NavbarItem from "./navBarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
