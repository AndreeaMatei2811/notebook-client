import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyNotebooks } from "../../store/user/selectors";
import Notebook from "../../components/notebook/Notebook";
import { fetchStudentNotebooks } from "../../store/Notebooks/actions";
import { useParams } from "react-router-dom";
import { selectStudentNotebooks } from "../../store/Notebooks/selectors";
import { Typography } from "@material-ui/core";
import "./ShowStudent.scss";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

export default function ShowStudent() {
  const dispatch = useDispatch();
  const studentNotebooks = useSelector(selectStudentNotebooks);
  const [searchText, set_searchText] = useState("");
  const studentId = parseInt(useParams().studentId);

  let filteredNotebooks = studentNotebooks;
  console.log("filteredNotebooks", filteredNotebooks);

  const student = filteredNotebooks.find(
    (student) => studentId === student.userId
  );

  console.log(student);

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
          {`${student?.user.username}'s notebooks`}
          {/* {`All notebooks`} */}
        </Typography>
      </div>

      <div
        style={{
          margin: "30px 15px 0px 0px",
          zIndex: "10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid rgb(228, 228, 228)",
            borderRadius: "5px",
            height: "30px",
            paddingLeft: "8px",
            paddingTop: "2px",
            position: "relative",
            top: "0px",
            left: "0vw",
            width: "200px",
            marginRight: "30px",
            marginBottom: "20px",
          }}
        >
          <div>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            type="text"
            value={searchText}
            onChange={(e) => set_searchText(e.target.value.toLowerCase())}
          />
        </div>
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
