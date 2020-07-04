import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import { getPdf } from "../teacher/apihelper/apicall";
import { isAuthenticated } from "../auth/apihelper/apicall";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogBox = ({ book = book }) => {
  const [open, setOpen] = useState(false);
  const [pdfurl, setPdfurl] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const { user, token } = isAuthenticated();

  const handleClickOpen = () => {
    setOpen(true);
    getPdf(book._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPdfurl(data);
        console.log(data);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Read
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose()}
              aria-label="close"
            >
              {/* <CloseIcon /> */}
              <h3>X</h3>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Now you are reading: {book.description}:
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleClose()}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <iframe
          src={pdfurl}
          style={{ width: "100%", height: "600px", position: "" }}
          frameBorder="0"
        ></iframe>
      </Dialog>
    </div>
  );
};

export default DialogBox;
