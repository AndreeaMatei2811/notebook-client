import React, { useEffect } from "react";
import "./FellowStudents.scss";
import { fetchAllNotebooks } from "../../store/Notebooks/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotebooks } from "../../store/Notebooks/selectors";
import { Link } from "react-router-dom";
import SwitchButton from "../../components/SwitchButton";

export default function FellowStudents() {
  const dispatch = useDispatch();
  const allNotebooks = useSelector(selectAllNotebooks);

  useEffect(() => {
    dispatch(fetchAllNotebooks());
  }, [dispatch]);

  return (
    <div>
      <div>
        <SwitchButton />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {allNotebooks.map((notebooks) => {
          return (
            <Link>
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
