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
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import goalimg from "../carouselimages/goal2.jpg";
import Helmet from "react-helmet";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Example from "../components/PieChart"

import Chip from "@material-ui/core/Chip";

class AddGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      finished:[],
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
    db.ref("/" + this.props.user.uid).set(this.state);
    console.log("DATA SAVED");
  };

  sendemail=(gname,gdesc)=>{


    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "utk61198@gmail.com",
      Password : "3D645EE1E58C08227E211DB0BA725BC8B266",
      To :this.props.user.email,
      From : "utk61198@gmail.com",
      Subject:"New Goal Added: "+gname,
      Body : gdesc
  }).then(
    message => alert(message)
  );


  }

  getUserData = () => {
    let ref = db.ref("/" + this.props.user.uid);
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let gname = this.refs.gname.value;
    let gdesc = this.refs.gdesc.value;
    let uid = this.refs.uid.value;
    let gdate = this.refs.gdate.value;
    let often = this.refs.often.value;
    let mo = this.refs.mo.value;
    let tu = this.refs.tu.value;
    let we = this.refs.we.value;
    let th = this.refs.th.value;
    let fr = this.refs.fr.value;
    let sa = this.refs.sa.value;
    let su = this.refs.su.value;

    if (uid && gname && gdesc && gdate) {
      const { goals } = this.state;
      const devIndex = goals.findIndex((data) => {
        return data.uid === uid;
      });
      goals[devIndex].gname = gname;
      goals[devIndex].gdesc = gdesc;
      goals[devIndex].gdate = gdate;
      goals[devIndex].often = often;
      goals[devIndex].mo = mo;
      goals[devIndex].tu = tu;
      goals[devIndex].we = we;
      goals[devIndex].th = th;
      goals[devIndex].fr = fr;
      goals[devIndex].sa = sa;
      goals[devIndex].su = su;

      this.setState({ goals });
    } else if (gname) {
      const uid = new Date().getTime().toString();
      const { goals } = this.state;
      goals.unshift({
        uid,
        gname,
        gdesc,
        gdate,
        often,
        mo,
        tu,
        we,
        th,
        fr,
        sa,
        su,
      });
      this.sendemail(gname,gdesc);
      console.log(this.props.user.email)
      this.setState({ goals });
    }

    this.refs.gname.value = "";
    this.refs.gdesc.value = "";
    this.refs.uid.value = "";
    this.refs.gdate.value = "";
    this.refs.often.value = "";
    this.refs.mo.value = "Mon";
    this.refs.tu.value = "Tue";
    this.refs.we.value = "Wed";
    this.refs.th.value = "Thu";
    this.refs.fr.value = "Fri";
    this.refs.sa.value = "Sat";
    this.refs.su.value = "Sun";
  };

  removeData = (goal) => {
    const {finished}=this.state
    const { goals } = this.state;
    const newState = goals.filter((data) => {
      return data.uid !== goal.uid;
    });
    finished.unshift(goal)

    this.setState({ goals: newState,
    finished
    
    });
  };

  updateData = (goal) => {
    this.refs.uid.value = goal.uid;
    this.refs.gname.value = goal.gname;
    this.refs.gdesc.value = goal.gdesc;
    this.refs.gdate.value = goal.gdate;
    this.refs.often.value = goal.often;
    this.refs.mo.value = goal.mo;
    this.refs.tu.value = goal.tu;
    this.refs.we.value = goal.we;
    this.refs.th.value = goal.th;
    this.refs.fr.value = goal.fr;
    this.refs.sa.value = goal.sa;
    this.refs.su.value = goal.su;
  };

  render() {
    const { goals } = this.state;
    const { finished } = this.state;

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
          justify="space-around"
          alignItems="flex-start"
          style={{
            // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            backgroundColor:"white",
            marginTop:"5%"
          }}
        >
          <div>
          <Example fin={goals.length} unfin={finished.length}/>

          </div>

          {goals.length > 0 && (
            <div>
              {/* <Paper elevation={20}>
              <Typography
                  gutterBottom
                  variant="h4"
                  color="primary"
                  align="left"
                  style={{
                    fontFamily: "Sansita Swashed",
                    marginBottom: "2%",
                    marginLeft: "10%",
                    backgroundColor:"white"
                  }}
                >
                  My Goals
                </Typography>
              </Paper> */}
            
            

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
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="150"
                          image={goalimg}
                        />
                        <CardContent>
                          <div>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {goal.gname}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              component="p"
                              gutterBottom
                            >
                              <Form.Control
                                as="textarea"
                                disabled={true}
                                value={goal.gdesc}
                              ></Form.Control>
                            </Typography>
                            <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItem="flex-start">

                            {<Chip color={goal.mo=="Yes"?"primary":"" } size="small" label="Mo"></Chip>}
                            { <Chip color={goal.tu=="Yes"?"primary":"" } size="small" label="Tu"></Chip>}
                            {<Chip color={goal.we=="Yes"?"primary":"" } size="small" label="We"></Chip>}
                            {<Chip color={goal.th=="Yes"?"primary":"" } size="small" label="Th"></Chip>}
                            {<Chip color={goal.fr=="Yes"?"primary":"" } size="small" label="Fr"></Chip>}
                            {<Chip color={goal.sa=="Yes"?"primary":"" } size="small" label="Sa"></Chip>}
                            {<Chip color={goal.su=="Yes"?"primary":"" } size="small" label="Su"></Chip>}

                            
                            </Grid>
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
                            variant="contained"
                            size="small"
                            endIcon={<DoneAllIcon />}
                            style={{
                              color: "green",
                              fontWeight: "bold",
                              marginBottom: "20%",
                            }}
                            onClick={() => this.removeData(goal)}
                          >
                            Finished
                          </Button>
                        </Typography>
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

                        <Typography
                          variant="body2"
                          color="secondary"
                          component="p"
                          align="left"
                        >
                          {goal.gdate}
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
            <Accordion elevation={20} style={{
              marginLeft:"2%",
             
            }}>
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
                    Add a new goal
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
                

                  <Form.Control type="hidden" ref="uid" />
                  <Typography gutterBottom>
                    <Form.Control
                      type="text"
                      ref="gname"
                      className="form-control"
                      placeholder="Goal title.."
                    />
                  </Typography>
                  <Typography gutterBottom>
                    <Form.Control
                      type="text"
                      ref="gdesc"
                      className="form-control"
                      placeholder="description.."
                    />
                  </Typography>
                  <Typography gutterBottom>
                    <Form.Control
                      type="date"
                      ref="gdate"
                      placeholder="Enter deadline"
                      style={{ width: "221px" }}
                    />
                  </Typography>
                  {/* <Form.Control type="checkbox" ref="daily"></Form.Control> */}
                  <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    style={{ fontFamily: "Sansita Swashed" }}
                  >
                    How often?
                  </Typography>

                  <Typography gutterBottom>
                    <Form.Control as="select" size="sm" ref="often">
                      <option>Daily</option>
                      <option>3 times a week</option>
                      <option>5 times a week</option>
                    </Form.Control>
                  </Typography>

                  <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    style={{ fontFamily: "Sansita Swashed" }}
                  >
                    Or customize
                  </Typography>
                  <Grid>
                    <Form.Control
                      as="select"
                      size="sm"
                      ref="mo"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Mon</option>

                      <option>Yes</option>
                      <option>No</option>
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="tu"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Tue</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="we"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Wed</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="th"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Thu</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="fr"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Fri</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="sa"
                      style={{ marginBottom: "4%", marginLeft: "3%" }}
                    >
                      <option>Sat</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>

                    <Form.Control
                      as="select"
                      size="sm"
                      ref="su"
                      style={{ marginBottom: "4%", marginLeft: "5%" }}
                    >
                      <option>Sun</option>
                      <option>Yes</option>
                      <option>No</option>{" "}
                    </Form.Control>
                  </Grid>

                  <Typography gutterBottom>
                    <Button variant="contained" type="submit" color="primary">
                      Save
                    </Button>
                  </Typography>
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

export default AddGoal;
