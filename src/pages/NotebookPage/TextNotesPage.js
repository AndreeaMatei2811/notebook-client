import React from "react";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function TextNotesPage() {
  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Textnotes" subheader="some subheader" />
      </div>
    </div>
  );
}
