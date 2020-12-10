import { IconButton } from "@material-ui/core";
import { Book, Code, Image, Note, NoteAdd, ViewList } from "@material-ui/icons";
import { useSelector } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import "./sidebar.scss";
import { Link as RouterLink } from "react-router-dom";
import { selectMyNotebooksIds } from "../../store/user/selectors";

export default function SidebarShowNotes({ setFilter, notebookId }) {
  const userNotebooks = useSelector(selectMyNotebooksIds);

  return (
    <div className="sidebar">
      {userNotebooks.includes(notebookId) ? (
        <IconButton
          aria-label="Add Note"
          component={RouterLink}
          to={`/show-notebook/${notebookId}/add`}
        >
          <NoteAdd />
        </IconButton>
      ) : null}
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
