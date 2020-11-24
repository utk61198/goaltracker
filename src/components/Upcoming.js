import React from "react";
import { motion } from "framer-motion";


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

class Upcoming extends React.Component {
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






  getUserData = () => {
    let ref = db.ref("/" + this.props.user.uid);
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };



  render() {
    const { goals } = this.state;
    const { finished } = this.state;
    let current = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    let tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow=tomorrow.toJSON().slice(0,10).replace(/-/g,'-');
let newstate=goals.filter((data) => {
  return data.gdate >= tomorrow;
})




   

    

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
            marginTop:"5%",
            borderRadius:"15px"

          }}
        >
          {/* <button onClick={()=>window.location.reload(false)}>Refresh</button> */}
        
          {newstate.length==0 && <Typography variant="subtitle" style={{fontFamily:"Sansita Swashed"}}>
          <Chip variant="outlined" color="primary" label=" You have no upcoming goals in 24 hours" />

           </Typography>}
          {newstate.length > 0 && (
            <div style={{overflowY:"scroll",height:"50vh"}}>
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
            
            

              {newstate.map((goal) => (
                <div key={goal.uid} style={{marginTop:"3%"}}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
                  <Paper
                  elevation={20}
                    style={{
                      display: "flex",
                      marginBottom: "5%",
                      justifyContent: "center",
                      marginLeft: "10%",
                      marginRight: "10%",
                      borderRadius:"20px",
                    }}
                  >      
                
                    <CardActionArea style={{ backgroundColor: "#ffc6c4",color:"white" ,borderRadius:"20px"}}>
                      <Grid
                      container
                      direction="row">
                      
                        <CardContent>
                          <Grid
                          container
                          direction="row">
                             <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                             
                            >
                              <Grid
                              container
                              direction="column"
                              justify="space-evenly">
                              {goal.gname}
                                <Chip size="small" color="secondary" label={goal.gdate}></Chip>

                              </Grid>
                           

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

                          </Grid>
                          <div>
                           
                            {/* <Grid
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

                            
                            </Grid> */}
                          </div>

                        </CardContent>
                      </Grid>
                    </CardActionArea>
                   
                  </Paper>
                    </motion.div>
                  
                </div>
              ))}
            </div>
          )}

          <div>
            
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Upcoming;
