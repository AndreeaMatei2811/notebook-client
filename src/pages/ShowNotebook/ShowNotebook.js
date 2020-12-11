import React, { useEffect, useState } from "react";
import SidebarShowNotes from "../../components/Sidebar/SidebarShowNotes";
import "./ShowNotebook.scss";
import NoteFeed from "./NoteFeed";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedNotebook } from "../../store/Notebooks/actions";
import { selectNotebook } from "../../store/Notebooks/selectors";
import { useParams, useHistory } from "react-router-dom";
import NoteEditor from "../../components/Notes/NoteEditor";
import {
  selectMyNotebooksIds,
  selectMyNotebooks,
} from "../../store/user/selectors";
import { Select, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function ShowNotebook() {
  const specificNotebook = useSelector(selectNotebook);
  const notebookId = parseInt(useParams().notebookId);
  const ownedNotebookIds = useSelector(selectMyNotebooksIds);
  const ownedNotebooks = useSelector(selectMyNotebooks);
  const [filter, set_filter] = useState("");
  const [filteredNotes, set_filteredNotes] = useState(specificNotebook.notes);
  const [showDropdown, set_showDropdown] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (ownedNotebookIds.includes(notebookId)) {
      set_showDropdown(true);
    }
  }, [notebookId, ownedNotebookIds]);

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

  //redirecting go back button
  const onClickGoBack = () => {
    if (showDropdown) {
      history.push("/my-notebooks");
    }
    if (!showDropdown) {
      history.push("/fellow-students");
    }
  };

  console.log(showDropdown);
  //filter on date
  const sortedNotesByDate = filteredNotes?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="notebook">
      <Fab
        style={{
          position: "absolute",
          margin: "10px",
          top: "20px",
          left: "20px",
        }}
        color="primary"
        aria-label="add"
        onClick={() => onClickGoBack()}
      >
        <ArrowBackIcon />
      </Fab>
      <div style={{ width: " 100%" }}>
        <div className="main">
          <div className="header">
            <Typography variant="h3" align="center" color="primary">
              {specificNotebook.name}
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="textSecondary"
            >{`Notebook owner: ${specificNotebook.user?.firstName} ${specificNotebook.user?.lastName}`}</Typography>
          </div>
          <div className="content">
            <div className="contentsidebar">
              <SidebarShowNotes
                setFilter={set_filter}
                notebookId={notebookId}
              />
            </div>
            <div className="contentnotes">
              {showDropdown ? (
                <Select
                  className="switchNotebook"
                  defaultValue="Select Subject"
                  variant="outlined"
                  id="demo-controlled-open-select"
                  color="primary"
                  onChange={(e) =>
                    history.push(`/show-notebook/${e.target.value}`)
                  }
                >
                  <option value="Select Subject">switch notebook</option>
                  {ownedNotebooks.map((notebook) => {
                    return (
                      <option value={notebook.id} key={notebook.id}>
                        {notebook.name}
                      </option>
                    );
                  })}
                </Select>
              ) : null}

              {filter === "showNoteEditor" ? (
                <NoteEditor />
              ) : (
                <div className="noteCards">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
