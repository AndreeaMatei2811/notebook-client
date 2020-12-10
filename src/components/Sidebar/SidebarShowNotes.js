import { IconButton } from "@material-ui/core";
import { Book, Code, Image, Note, NoteAdd, ViewList } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import "./sidebar.scss";
import { Link as RouterLink } from "react-router-dom";

export default function SidebarShowNotes({ setFilter }) {
  const setFilterOnClick = (filter) => {
    setFilter();
  };
  return (
    <div className="sidebar">
      <IconButton aria-label="Text Notes" onClick={(e) => setFilter("")}>
        <CancelIcon />
      </IconButton>
      <IconButton
        aria-label="Text Notes"
        onClick={(e) => setFilter("textnote")}
      >
        <Note />
      </IconButton>
      <IconButton aria-label="Snippets" onClick={(e) => setFilter("snippet")}>
        <Code />
      </IconButton>
      <IconButton
        aria-label="Definitions"
        onClick={(e) => setFilter("definition")}
      >
        <Book />
      </IconButton>
      <IconButton aria-label="Images" onClick={(e) => setFilter("stepbystep")}>
        <ViewList />
      </IconButton>
    </div>
  );
}
