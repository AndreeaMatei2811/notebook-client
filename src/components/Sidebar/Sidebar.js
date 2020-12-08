import { Book, Code, Image, Note, NoteAdd } from "@material-ui/icons";
import React from "react";
import "./sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <NoteAdd />
      <Note />
      <Code />
      <Book />
      <Image />
    </div>
  );
}
