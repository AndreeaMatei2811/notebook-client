import React, { useState } from "react"; // useEffect, useState
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { newNotebook } from "../../store/user/actions";

import { selectMyNotebooks } from "../../store/user/selectors";
import Notebook from "../../components/notebook/Notebook";
import { Form, Modal } from "react-bootstrap";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectMyNotebooks);
  console.log("my notebooks", myNotebooks);
  const [modalShow, setModalShow] = useState(false);
  const [name, set_name] = useState("");

  function submitNewNotebook() {
    dispatch(newNotebook(name));
    setModalShow(false);
  }

  // const [searchedNotebook, set_searchedNotebook] = useState("");

  // useEffect(() => {
  //   dispatch(fetchAllMyNotebooks());
  // }, [dispatch]);

  // const findNotebook = myNotebooks.find(
  //   (product) => searchedNotebook === product.name
  // );

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new notebook
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label for="inputName1">
                Please fill in a name of your new notebook
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName1"
                aria-describedby="name"
                placeholder="Name"
                onChange={(e) => set_name(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="selectSubject1">
                Please select a subject for your new notebook
              </label>
              <select className="form-control">
                <option>1</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitNewNotebook}>Add new notebook</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <h3 className="align-self-center p-4">All my notebooks</h3>
      <div>
        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 p-4">
          <input
            className="form-control form-control-sm mr-3 w-65"
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
        <Button onClick={() => setModalShow(true)}>Add new notebook</Button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div>
        {myNotebooks.map((notebook) => {
          return <Notebook key={notebook.id} name={notebook.name} />;
        })}
      </div>
    </div>
  );
}
