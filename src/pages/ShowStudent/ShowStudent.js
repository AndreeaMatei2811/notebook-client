import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyNotebooks } from "../../store/user/selectors";
import Notebook from "../../components/notebook/Notebook";
import { fetchStudentNotebooks } from "../../store/Notebooks/actions";
import { useParams } from "react-router-dom";
import { selectStudentNotebooks } from "../../store/Notebooks/selectors";
import { Typography } from "@material-ui/core";
import { selectUser } from "../../store/user/selectors";
import "./ShowStudent.scss";

export default function ShowStudent() {
  const dispatch = useDispatch();
  const studentNotebooks = useSelector(selectStudentNotebooks);
  const [searchText, set_searchText] = useState("");
  const studentId = parseInt(useParams().studentId);
  const user = useSelector(selectUser);

  let filteredNotebooks = studentNotebooks;

  useEffect(() => {
    dispatch(fetchStudentNotebooks(studentId));
  }, [dispatch, studentId]);

  if (searchText.length > 0) {
    filteredNotebooks = studentNotebooks.filter((i) => {
      const nameWithoutCaps = i.name.toLowerCase();
      return nameWithoutCaps.match(searchText);
    });
  }

  return (
    <div>
      <div className="header">
        <Typography variant="h3" align="center" color="primary">
          {user.firstName}
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          All notebooks
        </Typography>
      </div>

      <div>
        <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 p-4">
          <input
            className="form-control form-control-sm mr-3 w-65"
            type="text"
            placeholder="Search notebook"
            aria-label="Search"
            onChange={(e) => set_searchText(e.target.value.toLowerCase())}
          />
        </form>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredNotebooks?.map((notebook) => {
          return (
            <Notebook
              key={notebook.id}
              type="Notebook"
              notebookName={notebook.name}
              userName={notebook.user.username}
              imageUrl={notebook.user.imageUrl}
              createdAt={new Date(notebook.createdAt).toDateString()}
              notebookId={notebook.id}
            />
          );
        })}
      </div>
    </div>
  );
}
