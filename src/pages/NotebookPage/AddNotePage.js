import React from "react";
import NoteEditor from "../../components/Notes/NoteEditor";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./NotebookPage.scss";

export default function AddNotePage() {
  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Add a Note" subheader="some subheader" />

        <div className="addNote">
          <NoteEditor />
        </div>
      </div>
    </div>
  );
}
