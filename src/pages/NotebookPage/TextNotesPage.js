import React from "react";
import { useSelector } from "react-redux";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";

import { convertFromRaw } from "draft-js";
import { useParams } from "react-router-dom";
import { selectNotebook } from "../../store/Notebooks/selectors";
import RenderNoteEditor from "../../components/Notes/RenderNoteEditor";

export default function TextNotesPage() {
  const { notebookId } = useParams();
  const notebook = useSelector(selectNotebook);
  // console.log("notebook", notebook);
  const notes = notebook.notes;
  console.log("notebook id", notebookId);
  console.log(notes);
  // const note = useSelector(selectNewNote);
  // console.log("new note", note);
  // const jsonNote = JSON.parse(note.content);
  // console.log("backtosjon", jsonNote);
  // const noteToDisplay = convertFromRaw(jsonNote);

  // console.log("converted note", noteToDisplay);

  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Textnotes" subheader="some subheader" />
        <div className="notes">
          {notes?.map((note) => {
            return <RenderNoteEditor key={note.id} content={note.content} />;
          })}
        </div>
      </div>
    </div>
  );
}
