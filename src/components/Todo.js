import React from "react";

import Firebase from "firebase";
import { auth, db } from "../firebase";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  Paper,
  CardActions,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import goalimg from "../carouselimages/goal2.jpg";
import Helmet from "react-helmet";
import DeleteIcon from "@material-ui/icons/Delete";
import Example from "./Speechtodo";
import Dictaphone from "./Speechrecognition";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    db.ref("/" + this.props.user.uid + "notes").set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = db.ref("/" + this.props.user.uid + "notes");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let gname = this.refs.gname.value;
    let uid = this.refs.uid.value;

    if (uid && gname) {
      const { goals } = this.state;
      const devIndex = goals.findIndex((data) => {
        return data.uid === uid;
      });
      goals[devIndex].gname = gname;

      this.setState({ goals });
    } else if (gname) {
      const uid = new Date().getTime().toString();
      const { goals } = this.state;
      goals.unshift({ uid, gname });
      this.setState({ goals });
    }

    this.refs.gname.value = "";
    this.refs.uid.value = "";
  };
  setChildData = (data) => {
    console.log(data + " in todo ");
    this.refs.gname.value = data;
  };

  removeData = (goal) => {
    const { goals } = this.state;
    const newState = goals.filter((data) => {
      return data.uid !== goal.uid;
    });
    this.setState({ goals: newState });
  };

  updateData = (goal) => {
    this.refs.uid.value = goal.uid;
    this.refs.gname.value = goal.gname;
  };

  render() {
    const { goals } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="baseline"
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            borderRadius: "2vh",
          }}
        >
          {goals.length > 0 && (
            <div>
              <Typography
                gutterBottom
                variant="h4"
                color="primary"
                align="left"
                style={{
                  fontFamily: "Sansita Swashed",
                  marginBottom: "2%",
                  marginLeft: "10%",
                }}
              >
                To do List
              </Typography>

              

              {goals.map((goal) => (
                <div key={goal.uid}>
                  <Paper
                  elevation={20}
                    style={{
                      display: "flex",
                      marginBottom: "5%",
                      justifyContent: "center",
                      marginLeft: "10%",
                      marginRight: "10%",
                    }}
                  >
                    <CardActionArea style={{ color: "black" }}>
                      <Grid>
                        {/* <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="150"
                      image={goalimg}


                    /> */}
                        <CardContent>
                          <div>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              <Form.Control
                                as="textarea"
                                disabled={true}
                                value={goal.gname}
                              ></Form.Control>
                            </Typography>
                          </div>

                          {/* <Typography variant="body2" color="secondary" component="p" align="right" >
                      Goal Deadline: {goal.gdate}
                    </Typography> */}
                        </CardContent>
                      </Grid>
                    </CardActionArea>
                    <CardActions>
                      <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                      >
                        <Typography gutterBottom>
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            endIcon={<EditIcon />}
                            style={{ marginBottom: "20%" }}
                            onClick={() => this.updateData(goal)}
                          >
                            Edit
                          </Button>
                        </Typography>
                        <Typography gutterBottom>
                          <Example speech={goal.gname} />
                        </Typography>
                        <Typography gutterBottom>
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<DeleteIcon />}
                            style={{
                              backgroundColor: "red",
                              fontWeight: "bold",
                              marginBottom: "20%",
                            }}
                            onClick={() => this.removeData(goal)}
                          >
                            Delete
                          </Button>
                        </Typography>
                      </Grid>
                    </CardActions>
                  </Paper>
                </div>
              ))}
            </div>
          )}

          <div>
            <div>
            <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                       <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    style={{
                      fontFamily: "Sansita Swashed",
                      marginBottom: "2%",
                    }}
                    align="left"
                  >
                    Create a ToDo
                  </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
              <Form inline onSubmit={this.handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid container direction="row" justify="space-between">
                    <Form.Control type="hidden" ref="uid" />
                    <Typography gutterBottom>
                      <Form.Control
                        type="text"
                        ref="gname"
                        className="form-control"
                        placeholder="New Todo..."
                      />
                    </Typography>

                    <Typography gutterBottom>
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{ marginLeft: "5%" }}
                      >
                        <AddIcon />
                      </Button>
                    </Typography>
                  </Grid>

                  <Dictaphone passChildData={this.setChildData} />
                </Grid>
              </Form>
              </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ToDo;
