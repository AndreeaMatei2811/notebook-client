import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const token = useSelector(selectToken);
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [myNotebookActive, set_myNotebookActive] = useState(false);
  const [fellowStudentsActive, set_fellowStudentsActive] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const myNotebooks = () => {
    set_myNotebookActive(true);
    set_fellowStudentsActive(false);
    history.push("/my-notebooks");
  };

  const fellowStudents = () => {
    set_myNotebookActive(false);
    set_fellowStudentsActive(true);
    history.push("/fellow-students");
  };

  const displayProfile = () => {
    set_myNotebookActive(false);
    set_fellowStudentsActive(false);
    history.push("/my-profile");
  };

  const login = () => {
    set_myNotebookActive(false);
    set_fellowStudentsActive(false);
    history.push("/login");
  };

  const fontweightMyNotebook = myNotebookActive ? "600" : "400";
  const fontweightFollowStudents = fellowStudentsActive ? "600" : "400";

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {token ? (
        <div>
          <MenuItem onClick={() => displayProfile()}>Profile</MenuItem>
          <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => login()}>Login</MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar elevation={1} color="transparent" position="static">
        <Toolbar>
          <div className={classes.grow} />
          {token ? (
            <div className={classes.grow}>
              <Button color="inherit" onClick={() => myNotebooks()}>
                <h6 style={{ fontWeight: fontweightMyNotebook }}>
                  My Notebooks
                </h6>
              </Button>
              |
              <Button color="inherit" onClick={() => fellowStudents()}>
                <h6
                  style={{
                    fontWeight: fontweightFollowStudents,
                  }}
                >
                  Fellow Students
                </h6>
              </Button>
            </div>
          ) : null}

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
}
