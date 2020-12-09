import React, { useEffect, useState } from "react"; // useEffect, useState
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { newNotebook } from "../../store/user/actions";

import { selectMyNotebooks } from "../../store/user/selectors";
import { selectAllSubjects } from "../../store/subjects/selectors";
import Notebook from "../../components/notebook/Notebook";
import { Form, Modal } from "react-bootstrap";
import { fetchAllSubjects } from "../../store/subjects/actions";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectMyNotebooks);
  const subjects = useSelector(selectAllSubjects);

  const [modalShow, setModalShow] = useState(false);
  const [name, set_name] = useState("");
  const [subjectId, set_subjectId] = useState();

  const onChangeName = (e) => {
    console.log("onChangeName", e.target.value);

    set_name(e.target.value);
  };

  const onChangeSelect = (e) => {
    const subject = subjects.find((subject) => subject.name === e.target.value);
    console.log("onChangeSelect", subject.id);
    // set_subjectId(subject.id);
  };

  console.log("subjectId", subjectId);
  console.log("name", name);
  // console.log("subjects", subjects);
  // console.log("my notebooks", myNotebooks);

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  function submitNewNotebook() {
    // dispatch(newNotebook(name, subjectId));
    console.log("got run");
    // setModalShow(false);
    // set_name("");
    // set_subjectId();
  }

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
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Please fill in a name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                // value={name}
                onChange={(e) => onChangeName(e)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSubject">
              <Form.Label>Please select a subject</Form.Label>
              <Form.Control as="select" onChange={(e) => onChangeSelect(e)}>
                {subjects.map((subject) => {
                  return (
                    <option value={subject.name} key={subject.id}>
                      {subject.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
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
        <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 p-4">
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

      <div>
        {/* <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Please fill in a name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => set_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSubject">
            <Form.Label>Please select a subject</Form.Label>
            <Form.Control as="select" onChange={onChangeSelect}>
              {subjects.map((subject) => {
                return (
                  <option value={subject.name} key={subject.id}>
                    {subject.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button onClick={submitNewNotebook}>Add new notebook</Button>
        </Form> */}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div>
        {myNotebooks.map((notebook) => {
          return (
            // <CardDeck>
            <Notebook key={notebook.id} name={notebook.name} />
            // </CardDeck>
          );
        })}
      </div>
    </div>
  );
}
