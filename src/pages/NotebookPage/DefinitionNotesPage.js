import React from "react";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./NotebookPage.scss";

export default function DefinitionNotesPage() {
  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Definitions" subheader="some subheader" />
      </div>
    </div>
  );
}
