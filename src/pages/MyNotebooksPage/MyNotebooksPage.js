import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyNotebooks } from "../../store/myNotebooks/actions";
import { selectMyNotebooks } from "../../store/user/selectors";
import Notebook from "../../components/notebook/Notebook";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectMyNotebooks);
  console.log("my notebooks", myNotebooks);

  const [searchedNotebook, set_searchedNotebook] = useState("");

  // useEffect(() => {
  //   dispatch(fetchAllMyNotebooks());
  // }, [dispatch]);

  // const findNotebook = myNotebooks.find(
  //   (product) => searchedNotebook === product.name
  // );

  return (
    <div>
      <h3 class="align-self-center p-4">All my notebooks</h3>
      <div>
        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 p-4">
          <input
            class="form-control form-control-sm mr-3 w-65"
            type="text"
            placeholder="Search notebook"
            aria-label="Search"
            // onChange={(event) => {
            //   set_searchedNotebook(event.target.value);
            // }}
          />
        </form>
        {/* <div>
          {findNotebook ? (
            <Notebook key={findNotebook.id} name={findNotebook.name} />
          ) : (
            <div></div>
          )}
        </div> */}
      </div>
      <div>
        {myNotebooks.map((notebook) => {
          return <Notebook key={notebook.id} name={notebook.name} />;
        })}
      </div>
    </div>
  );
}
