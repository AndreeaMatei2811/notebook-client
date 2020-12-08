import React from "react";
import AddNote from "../../components/Notes/AddNote";
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
        <AddNote />
      </div>
    </div>
  );
}
