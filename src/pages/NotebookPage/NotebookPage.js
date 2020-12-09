import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotebookHeader from "../../components/Notes/NotebookHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fetchSelectedNotebook } from "../../store/Notebooks/actions";
import { selectNotebook } from "../../store/Notebooks/selectors";
import "./NotebookPage.scss";

export default function NotebookPage() {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  console.log("notebook id", notebookId);
  const notebook = useSelector(selectNotebook);
  console.log("notebook", notebook);

  useEffect(() => {
    dispatch(fetchSelectedNotebook(notebookId));
  }, [dispatch, notebookId]);

  return (
    <div className="notebook">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
        <NotebookHeader header="Notebook" subheader="some subheader" />
      </div>
    </div>
  );
}
