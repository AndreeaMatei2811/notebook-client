import React, { useEffect, useState } from "react";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import SidebarShowNotes from "../../components/Sidebar/SidebarShowNotes";
import "./ShowNotebook.scss";
import NoteFeed from "./NoteFeed";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedNotebook } from "../../store/Notebooks/actions";
import { selectNotebook } from "../../store/Notebooks/selectors";
import { useParams } from "react-router-dom";

export default function ShowNotebook() {
  const specificNotebook = useSelector(selectNotebook);
  const notebookId = parseInt(useParams().notebookId);
  const [filter, set_filter] = useState("");
  const [filteredNotes, set_filteredNotes] = useState(specificNotebook.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedNotebook(notebookId));
  }, [dispatch, notebookId]);

  //filtering logic
  useEffect(() => {
    if (filter) {
      const notesFiltered = specificNotebook.notes?.filter((note) => {
        return note.typeOfNote === filter;
      });
      set_filteredNotes(notesFiltered);
      return;
    }
    set_filteredNotes(specificNotebook.notes);
  }, [filter, specificNotebook]);

  //filter on date
  const sortedNotesByDate = filteredNotes?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="notebook">
      <div className="side">
        <SidebarShowNotes setFilter={set_filter} />
      </div>
      <div style={{ width: " 100%" }}>
        <div className="main">
          <NotebookHeader
            header={specificNotebook.name}
            subheader={`Notebook owner: ${specificNotebook.user?.firstName} ${specificNotebook.user?.lastName}`}
          />
        </div>

        <div style={{ margin: "10px" }}>
          {sortedNotesByDate?.map((note, i) => {
            return (
              <NoteFeed
                key={i}
                title={note.title}
                content={note.content}
                date={note.createdAt}
                type={note.typeOfNote}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
