import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyNotebooks } from "../../store/myNotebooks/actions";
import { selectAllMyNotebooks } from "../../store/myNotebooks/selectors";
import Notebook from "../../components/notebook/Notebook";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectAllMyNotebooks);
  const [searchedNotebook, set_searchedNotebook] = useState("");

  useEffect(() => {
    dispatch(fetchAllMyNotebooks());
  }, [dispatch]);

  const findNotebook = myNotebooks.find(
    (product) => searchedNotebook === product.name
  );

  return (
    <div>
      <h3>All my notebooks</h3>
      <div>
        <input
          class="form-control"
          type="text"
          placeholder="Search notebook"
          aria-label="Search"
          options={myNotebooks.map((notebook) => notebook.name)}
          onChange={(event, newValue) => {
            set_searchedNotebook(newValue);
          }}
        />
        <div>
          {findNotebook ? (
            <Notebook key={findNotebook.id} name={findNotebook.name} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        {myNotebooks.map((notebook) => {
          return <Notebook key={notebook.id} name={notebook.name} />;
        })}
      </div>
    </div>
  );
}
