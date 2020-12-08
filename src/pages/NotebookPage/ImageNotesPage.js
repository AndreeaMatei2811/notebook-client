import React from "react";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./NotebookPage.scss";

export default function ImageNotesPage() {
  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Images" subheader="some subheader" />
      </div>
    </div>
  );
}
