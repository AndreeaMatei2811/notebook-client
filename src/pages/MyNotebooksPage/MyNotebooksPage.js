import React, { useEffect, useState } from "react"; // useEffect, useState
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { newNotebook } from "../../store/user/actions";

import { selectMyNotebooks } from "../../store/user/selectors";
import { selectAllSubjects } from "../../store/subjects/selectors";
import Notebook from "../../components/notebook/Notebook";

import { fetchAllSubjects } from "../../store/subjects/actions";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InputLabel, Select } from "@material-ui/core";

export default function MyNotebooksPage() {
  const dispatch = useDispatch();
  const myNotebooks = useSelector(selectMyNotebooks);
  const subjects = useSelector(selectAllSubjects);

  let filteredNotebooks = myNotebooks;

  const [name, set_name] = useState("");
  const [subjectId, set_subjectId] = useState();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchText, set_searchText] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onChangeName = (e) => {
    set_name(e.target.value);
  };

  const onChangeSelect = (e) => {
    const subject = subjects.find((subject) => subject.name === e.target.value);
    set_subjectId(subject.id);
  };

  // console.log("subjectId", subjectId);
  // console.log("name", name);
  // console.log("subjects", subjects);
  console.log("my notebooks", myNotebooks);

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  function submitNewNotebook() {
    dispatch(newNotebook(name, subjectId));
    console.log("got run");
    setOpenDialog(false);
    set_name("");
    set_subjectId();
  }

  // useEffect(() => {
  //   set_searchText("");
  // }, [buttonState]);

  if (searchText.length > 0) {
    filteredNotebooks = myNotebooks.filter((i) => {
      const nameWithoutCaps = i.name.toLowerCase();
      return nameWithoutCaps.match(searchText);
    });
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
            onChange={(e) => set_searchText(e.target.value.toLowerCase())}
          />
        </form>
      </div>

      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add new notebook
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new notebook</DialogTitle>
          <DialogContent>
            <div
              style={{
                margin: 20,
              }}
            >
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={(e) => onChangeName(e)}
              />
            </div>

            <div
              style={{
                margin: 20,
              }}
            >
              <InputLabel>Select Subject</InputLabel>
              <Select
                variant="outlined"
                fullWidth
                id="demo-controlled-open-select"
                color="primary"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                defaultValue="Select Subject"
                onChange={onChangeSelect}
              >
                <option value="Select Subject"></option>
                {subjects.map((subject) => {
                  return (
                    <option value={subject.name} key={subject.id}>
                      {subject.name}
                    </option>
                  );
                })}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={submitNewNotebook} color="primary">
              Add new notebook
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredNotebooks.map((notebook) => {
          return (
            // <CardDeck>
            <Notebook
              key={notebook.id}
              type="Notebook"
              notebookName={notebook.name}
              createdAt={new Date(notebook.createdAt).toDateString()}
            />
            // </CardDeck>
          );
        })}
      </div>
    </div>
  );
}
