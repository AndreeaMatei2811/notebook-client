import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyNotebooks } from "../../store/myNotebooks/actions";
import { selectAllMyNotebooks } from "../../store/myNotebooks/selectors";
import Notebook from "../../components/notebook/Notebook";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectAllMyNotebooks);

  useEffect(() => {
    dispatch(fetchAllMyNotebooks());
  }, [dispatch]);

  return (
    <div>
      <h3>All my notebooks</h3>
      <div>
        {myNotebooks.map((notebook) => {
          return <Notebook key={notebook.id} name={notebook.name} />;
        })}
      </div>
    </div>
  );
}
