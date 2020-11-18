import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import AddIcon from "@material-ui/icons/Add";
import Helmet from "react-helmet";
import { Add } from "@material-ui/icons";
import MicOffIcon from "@material-ui/icons/MicOff";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

function Dictaphone(props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const functionHandler = () => {
    console.log(transcript);
    props.passChildData(transcript);
    resetTranscript();
  };
  const startfun = () => {
    SpeechRecognition.startListening();
    handleClick();
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Typography
        color="primary"
        variant="h4"
        style={{ fontFamily: "Sansita Swashed" }}
        align="center"
        gutterBottom
      ></Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-end"
        style={{ marginLeft: "75px" }}
      >
        <Typography gutterBottom>
          <Button color="primary" variant="contained" onClick={startfun}>
            <MicIcon />
          </Button>
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={SpeechRecognition.stopListening && functionHandler}
          style={{ marginLeft: "" }}
        >
          <MicOffIcon />
        </Button>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            capturing voice..
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
}
export default Dictaphone;
