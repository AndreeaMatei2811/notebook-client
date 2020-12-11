import React, { useEffect, useState } from "react";
import "./FellowStudents.scss";
import { fetchAllNotebooks } from "../../store/Notebooks/actions";
import { fetchAllUsers } from "../../store/AllUsers/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotebooks } from "../../store/Notebooks/selectors";
import { selectAllUsers } from "../../store/AllUsers/selectors";
import Notebook from "../../components/notebook/Notebook";
import UserCard from "../../components/UserCard/UserCard";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import SwitchButton from "../../components/SwitchButton";
import {
  InputLabel,
  Select,
  Button,
  FormControl,
  Input,
  Typography,
  makeStyles,
} from "@material-ui/core";

export default function FellowStudents() {
  const dispatch = useDispatch();
  const allNotebooks = useSelector(selectAllNotebooks);
  const [buttonState, set_buttonState] = useState(true);
  const allUsers = useSelector(selectAllUsers);
  const [searchText, set_searchText] = useState("");

  let filteredUsers = allUsers;
  let filteredNotebooks = allNotebooks;

  useEffect(() => {
    dispatch(fetchAllNotebooks());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    set_searchText("");
  }, [buttonState]);

  if (searchText.length > 0 && buttonState) {
    filteredUsers = allUsers.filter((i) => {
      const firstNameWithoutCaps = `${i.firstName.toLowerCase()} ${i.lastName.toLowerCase()}`;
      return firstNameWithoutCaps.match(searchText);
    });
  }

  if (searchText.length > 0 && !buttonState) {
    filteredNotebooks = allNotebooks.filter((i) => {
      const nameWithoutCaps = i.name.toLowerCase();
      return nameWithoutCaps.match(searchText);
    });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Typography align="center" color="primary" variant="h3">
          Fellow Students
        </Typography>
      </div>
      <div
        style={{
          margin: "0px 15px",
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
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Users</p>
          <SwitchButton buttonState={buttonState} setButton={set_buttonState} />
          <p>Notebooks</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {buttonState
          ? filteredUsers.map((user) => {
              return (
                <div key={user.id}>
                  <UserCard
                    type="User"
                    name={`${user.firstName} ${user.lastName}`}
                    imageUrl={user.imageUrl}
                    createdAt={new Date(user.createdAt).toDateString()}
                    studentId={user.id}
                  ></UserCard>
                </div>
              );
            })
          : filteredNotebooks.map((notebook) => {
              return (
                <div key={notebook.id}>
                  <Notebook
                    type="Notebook"
                    notebookName={notebook.name}
                    userName={notebook.user.username}
                    imageUrl={notebook.user.imageUrl}
                    createdAt={new Date(notebook.createdAt).toDateString()}
                    notebookId={notebook.id}
                  ></Notebook>
                </div>
              );
            })}
      </div>
    </div>
  );
}
