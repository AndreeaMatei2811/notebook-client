import React, { useEffect, useState } from "react"; // useEffect, useState
import { useDispatch, useSelector } from "react-redux";

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

import {
  InputLabel,
  Select,
  Button,
  FormControl,
  Input,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "./MyNotebooks.scss";

import { InputLabel, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";


export default function MyNotebooksPage() {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      minWidth: 275,
      marginTop: 22,
      marginBottom: 12,
      padding: 20,
    },
    table: {
      minWidth: 650,
    },
  }));
  const classes = useStyles();

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
  // console.log("my notebooks", myNotebooks);

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
    <div className="my-notebooks">
      <Typography variant="h3">My notebooks</Typography>
      <div>

        <FormControl>
          <Input
            style={{
              margin: 20,
            }}

        <div
          style={{
            display: "flex",
            border: "1px solid rgb(228, 228, 228)",
            borderRadius: "15px",
            height: "30px",
            paddingLeft: "8px",
            position: "fixed",
            top: "15px",
            left: "50px",
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

        </FormControl>

        </div>

      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          style={{
            margin: 20,
          }}
        >
          Add new notebook
        </Button>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new notebook</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                style={{ width: 550, marginBottom: 40 }}
                // fullWidth
                onChange={(e) => onChangeName(e)}
              />
            </FormControl>

            {/* <FormControl> */}
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
              style={{ width: 550, marginBottom: 30 }}
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
            {/* </FormControl> */}
          </DialogContent>
          <DialogActions style={{ marginBottom: 30, marginRight: 20 }}>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={submitNewNotebook}
              color="primary"
              variant="contained"
            >
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
            <Notebook
              key={notebook.id}
              type="Notebook"
              notebookName={notebook.name}
              createdAt={new Date(notebook.createdAt).toDateString()}
              notebookId={notebook.id}
            />
          );
        })}
      </div>
    </div>
  );
}
