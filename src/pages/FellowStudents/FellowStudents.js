import React, { useEffect, useState } from "react";
import "./FellowStudents.scss";
import { fetchAllNotebooks } from "../../store/Notebooks/actions";
import { fetchAllUsers } from "../../store/AllUsers/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotebooks } from "../../store/Notebooks/selectors";
import { selectAllUsers } from "../../store/AllUsers/selectors";
import Notebook from "../../components/notebook/Notebook";
import UserCard from "../../components/UserCard/UserCard";

import SwitchButton from "../../components/SwitchButton";

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
      <div style={{ position: "absolute", margin: "0px 15px" }}>
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => set_searchText(e.target.value.toLowerCase())}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <p>Users</p>
        <SwitchButton buttonState={buttonState} setButton={set_buttonState} />
        <p>Notebooks</p>
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
