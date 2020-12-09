import React from "react";
import { useSelector } from "react-redux";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { selectNotebook } from "../../store/Notebooks/selectors";
import RenderNoteEditor from "../../components/Notes/RenderNoteEditor";
import "./TextNotesPage.scss";

export default function TextNotesPage() {
  const { notebookId } = useParams();
  const notebook = useSelector(selectNotebook);

  const notes = notebook.notes;
  console.log("notebook id", notebookId);
  console.log(notes);

  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Textnotes" subheader="some subheader" />
        <div className="notebook_texnotes">
          {notes?.map((note) => {
            return (
              <div className="textnotes_note">
                <RenderNoteEditor key={note.id} content={note.content} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
