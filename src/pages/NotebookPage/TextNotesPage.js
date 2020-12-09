import React from "react";
import { useSelector } from "react-redux";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { selectNewNote } from "../../store/Notebooks/selectors";
import { convertFromRaw } from "draft-js";

export default function TextNotesPage() {
  const note = useSelector(selectNewNote);
  console.log("new note", note);
  const jsonNote = JSON.parse(note.content);
  console.log("backtosjon", jsonNote);
  const noteToDisplay = convertFromRaw(jsonNote);

  console.log("converted note", noteToDisplay);

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
