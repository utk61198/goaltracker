import React from "react";

import Firebase from "firebase";
import { auth, db } from '../firebase';
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
    CardContent
} from "@material-ui/core"
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import goalimg from "../carouselimages/goal2.jpg"




class AddGoal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goals: []
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

    getUserData = () => {
        let ref = db.ref("/" + this.props.user.uid);
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let gname = this.refs.gname.value;
        let gdesc = this.refs.gdesc.value;
        let uid = this.refs.uid.value;
        let gdate = this.refs.gdate.value;
        let often = this.refs.often.value

        if (uid && gname && gdesc && gdate) {
            const { goals } = this.state;
            const devIndex = goals.findIndex(data => {
                return data.uid === uid;
            });
            goals[devIndex].gname = gname;
            goals[devIndex].gdesc = gdesc;
            goals[devIndex].gdate = gdate;
            goals[devIndex].often = often

            this.setState({ goals });
        } else if (gname && gdesc && gdate) {
            const uid = new Date().getTime().toString();
            const { goals } = this.state;
            goals.push({ uid, gname, gdesc, gdate, often });
            this.setState({ goals });
        }

        this.refs.gname.value = "";
        this.refs.gdesc.value = "";
        this.refs.uid.value = "";
        this.refs.gdate.value = "";
        this.refs.often.value = "";
    };

    removeData = goal => {
        const { goals } = this.state;
        const newState = goals.filter(data => {
            return data.uid !== goal.uid;
        });
        this.setState({ goals: newState });
    };

    updateData = goal => {
        this.refs.uid.value = goal.uid;
        this.refs.gname.value = goal.gname;
        this.refs.gdesc.value = goal.gdesc;
        this.refs.gdate.value = goal.gdate
        this.refs.often.value = goal.often
    };

    render() {
        const { goals } = this.state;
        return (
            <React.Fragment>
                <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="baseline"
                style={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'



                }}>
                <div>



                    <div>
                        <Form onSubmit={
                            this.handleSubmit
                        }>


                            <Grid
                                container
                                direction="column"
                                justify="space-around"
                                alignItems="center"


                            >
                                <Typography variant="h4" gutterBottom color="primary" style={{ fontFamily: "Sansita Swashed", marginBottom: "2%" }} align="left">
                        Add a new goal

                                </Typography>

                               

                                <Form.Control type="hidden" ref="uid" />
                                <Typography gutterBottom>
                                    <Form.Control type="text" ref="gname" className="form-control" placeholder="Goal title.." />
                                </Typography>
                                <Typography gutterBottom>
                                    <Form.Control type="text" ref="gdesc" className="form-control" placeholder="description.." />
                                </Typography>
                                <Typography gutterBottom>
                                    <Form.Control type="date" ref="gdate" placeholder="Enter deadline" style={{width:"221px"}} />


                                </Typography>
                                {/* <Form.Control type="checkbox" ref="daily"></Form.Control> */}
                                <Typography variant="h5" gutterBottom color="primary">
                                    How often?
                                    
                                </Typography>

                                <Typography gutterBottom>
                                    <Form.Control as="select" size="sm" ref="often">
                                        <option>Daily</option>
                                        <option>3 times a week</option>
                                        <option>5 times a week</option>

                                        

                                       

                                    </Form.Control>
                                    </Typography>


                                    {/* <Typography variant="h5" gutterBottom color="primary">
                                    Or customize
                                    
                                </Typography> */}
                                {/* <Typography component="div" style={{ backgroundColor: '#5AB9EA', paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", borderRadius: "20px" }} gutterBottom>
                                    {['checkbox'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Grid
                                                container
                                                direction="column">
                                                <Form.Check inline label="Monday" type={type} id={`inline-${type}-1`} style={{ color: "white" }} />
                                                <Form.Check inline label="Tuesday" type={type} id={`inline-${type}-2`} style={{ color: "white" }} />
                                                <Form.Check inline label="Wednesday" type={type} id={`inline-${type}-1`} style={{ color: "white" }} />
                                                <Form.Check inline label="Thursday" type={type} id={`inline-${type}-2`} style={{ color: "white" }} />
                                                <Form.Check inline label="Friday" type={type} id={`inline-${type}-1`} style={{ color: "white" }} />
                                                <Form.Check inline label="Saturday" type={type} id={`inline-${type}-2`} style={{ color: "white" }} />
                                                <Form.Check inline label="Sunday" type={type} id={`inline-${type}-1`} style={{ color: "white" }} />

                                            </Grid>


                                        </div>
                                    ))}
                                </Typography> */}


                                <Typography gutterBottom>
                                    <Button variant="contained" type="submit" color="primary">
                                        Save
                                </Button>

                                </Typography>


                            </Grid>

                        </Form>
                    </div>

                </div>


                <div>


                <Typography gutterBottom variant='h4' color="primary" align="left" style={{ fontFamily: "Sansita Swashed", marginBottom: "2%" }}>
                        My Goals
                  </Typography>
        {

          goals.map(goal => (
            <div key={goal.uid}>

              <Card style={{
                display: 'flex',
                marginBottom: "5%",
                justifyContent: "center",
                marginLeft: "1%",
                marginRight: "1%",

              }}>
                <CardActionArea style={{ color: "black" }}>
                  <Grid>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="150"
                      image={goalimg}


                    />
                    <CardContent >


                      <div>


                        <Typography gutterBottom variant="h5" component="h2">
                          {goal.gname}

                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
                         <Form.Control as="textarea" disabled={true} value={goal.gdesc}></Form.Control>
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
                      <Button variant="contained" size="small" endIcon={<DoneAllIcon />} style={{ color: "green", fontWeight: "bold", marginBottom: "20%" }
                    }
                    onClick={()=>this.removeData(goal)}
                    >
                        Finished</Button>

                    </Typography>
                    <Typography gutterBottom>
                      <Button variant="outlined" size="small" color="primary" endIcon={<EditIcon />} style={{ marginBottom: "20%" }}
                      onClick={()=>this.updateData(goal)}>
                        Edit</Button>

                    </Typography>


                  

                    <Typography variant="body2" color="secondary" component="p" align="left">
                      {goal.gdate}
                    </Typography>

                  </Grid>

                </CardActions>
              </Card>








            </div>







          ))}
      </div>
      </Grid>

            </React.Fragment>
        );
    }
}

export default AddGoal;
