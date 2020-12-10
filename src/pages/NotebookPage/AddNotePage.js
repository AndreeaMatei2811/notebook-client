import React from "react";
import NoteEditor from "../../components/Notes/NoteEditor";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import SidebarShowNotes from "../../components/Sidebar/Sidebar";
import "./NotebookPage.scss";

export default function AddNotePage() {
  return (
    <div className="notebook">
      <div className="main">
        <NotebookHeader header="Add a Note" subheader="some subheader" />

        <div className="addNote">
          <NoteEditor />
        </div>
      </div>
    </div>
  );
}
