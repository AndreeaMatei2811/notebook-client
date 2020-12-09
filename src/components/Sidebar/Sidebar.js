import { IconButton } from "@material-ui/core";
import { Book, Code, Image, Note, NoteAdd } from "@material-ui/icons";
import React from "react";
import "./sidebar.scss";
import { Link as RouterLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <IconButton
        aria-label="Add Note"
        component={RouterLink}
        to="/notebook/1/add"
      >
        <NoteAdd />
      </IconButton>
      <IconButton
        aria-label="Text Notes"
        component={RouterLink}
        to="/notebook/1/textnotes"
      >
        <Note />
      </IconButton>
      <IconButton
        aria-label="Snippets"
        component={RouterLink}
        to="/notebook/1/snippets"
      >
        <Code />
      </IconButton>
      <IconButton
        aria-label="Definitions"
        component={RouterLink}
        to="/notebook/1/definitions"
      >
        <Book />
      </IconButton>
      <IconButton
        aria-label="Images"
        component={RouterLink}
        to="/notebook/1/images"
      >
        <Image />
      </IconButton>
    </div>
  );
}
