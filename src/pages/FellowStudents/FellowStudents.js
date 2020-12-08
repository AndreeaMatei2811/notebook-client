import React, { useEffect, useState } from "react";
import "./FellowStudents.scss";
import { fetchAllNotebooks } from "../../store/Notebooks/actions";
import { fetchAllUsers } from "../../store/AllUsers/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotebooks } from "../../store/Notebooks/selectors";
import { selectAllUsers } from "../../store/AllUsers/selectors";
import { Link } from "react-router-dom";
import SwitchButton from "../../components/SwitchButton";

export default function FellowStudents() {
  const dispatch = useDispatch();
  const allNotebooks = useSelector(selectAllNotebooks);
  const [buttonState, set_buttonState] = useState(true);
  const allUsers = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchAllNotebooks());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
        {" "}
        {buttonState
          ? allUsers.map((user) => {
              return (
                <Link key={user.id} to="/">
                  <div
                    style={{
                      border: "1px solid black",
                      width: "25vw",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{
                          width: "20px",
                          height: "28px",
                          borderRadius: "5px",
                        }}
                        src={user.imageUrl}
                      ></img>
                    </div>
                  </div>
                </Link>
              );
            })
          : allNotebooks.map((notebooks) => {
              return (
                <Link key={notebooks.id} to="/">
                  <div
                    style={{
                      border: "1px solid black",
                      width: "25vw",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <p>{notebooks.name}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        style={{
                          width: "20px",
                          height: "28px",
                          borderRadius: "5px",
                        }}
                        src={notebooks.user.imageUrl}
                      ></img>
                      <p>{notebooks.user.username}</p>
                    </div>
                    <p>{notebooks.createdAt}</p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
