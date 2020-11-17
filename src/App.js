// App.js
import React from 'react';
import { signInWithGoogle, signInWithFacebook } from './firebase';
import { auth } from './firebase';
import { Grid, Button, Paper, Typography, Divider } from '@material-ui/core';
import AddGoal from "./components/Addgoal";
// import NavBar from "./components/Navbar"
import FacebookIcon from '@material-ui/icons/Facebook';
import Helmet from "react-helmet"
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  FcGoogle
} from 'react-icons/fc';
import Slide from "./components/Caraousel"
import List from "./components/GoalList"
import { motion } from "framer-motion"
import logo from "./carouselimages/logo192.png"
import { Tabs, Tab } from 'react-bootstrap';
import ToDo from "./components/Todo"



// import { Add } from '@material-ui/icons';
// import UserDetail from './components/UserDetails';




class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (

      <div>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Sansita+Swashed&display=swap" rel="stylesheet" />
        </Helmet>
        {

          this.state.currentUser ?

            (

              <div style={{
                // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                background: "#AA076B",  /* fallback for old browsers */
background: "-webkit-linear-gradient(to right, #61045F, #AA076B)",  /* Chrome 10-25, Safari 5.1-6 */
background: "linear-gradient(to right, #61045F, #AA076B)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                height: "100vh"


              }}>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Brand href="#home">Goal Tracker</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                      <Nav.Link href="#features">Dashboard</Nav.Link>
                      <Button variant="contained" color="secondary" onClick={() => auth.signOut()}>Log Out</Button>



                    </Nav>

                  </Navbar.Collapse>
                </Navbar>







                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  style={{
                    background: "#AA076B",  /* fallback for old browsers */
background: "-webkit-linear-gradient(to right, #61045F, #AA076B)",  /* Chrome 10-25, Safari 5.1-6 */
background: "linear-gradient(to right, #61045F, #AA076B)",



                  }}

                >

                  <Slide/>
                  {/* <speech></speech> */}
                  
                  




                  <Tabs
          id="controlled-tab-example"
          style={{marginTop:"2%"}}
          
        >
   
          <Tab eventKey="goals" title="Goals">
          <AddGoal user={this.state.currentUser} />
          </Tab>
          <Tab eventKey="todo" title="To do">
            <ToDo user={this.state.currentUser}/>
            
          </Tab>
      
       
        </Tabs>












               
                      


                   
                </Grid>


              </div>
            )






            :


            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              style={{ marginTop: "10%" }}

            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1.05, 1.05, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  loop: Infinity,
                  repeatDelay: 1
                }}
              >

                <Typography gutterBottom>
                  <img src={logo} />



                </Typography>
              </motion.div>

              <Typography variant="h2" component="h2" gutterBottom color="primary">
                Goal Tracker</Typography>



              <Paper
                elevation={3}
              >



                <Button variant="outlined" onClick={signInWithGoogle} color="primary" startIcon={<FcGoogle />}>
                  Sign in with Google</Button>

              </Paper>


              <Divider variant="middle"
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  width: "15%"
                }}
              ></Divider>


              <Paper>


                <Button variant="contained" onClick={signInWithFacebook} color="primary" startIcon={<FacebookIcon />}>
                  Sign in with FaceBook</Button>

              </Paper>



            </Grid>







        }
      </div >
    );
  }
}


export default App;
