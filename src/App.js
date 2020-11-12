// App.js
import React from 'react';
import { signInWithGoogle, signInWithFacebook } from './firebase';
import { auth } from './firebase';
import { Grid, Button, Paper, Typography,Divider} from '@material-ui/core';
import Dashboad from "./components/dashboard";
import NavBar from "./components/Navbar"
import FacebookIcon from '@material-ui/icons/Facebook';

import { FcGoogle
} from 'react-icons/fc';



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
        {

          this.state.currentUser ?

            (

              <div>
                <NavBar />

                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  style={{ marginTop: "10px" }}
                >

                  {/* <UserDetail user={this.state.currentUser}/> */}

                  <Dashboad user={this.state.currentUser} />
                  <Button variant="outlined" color="primary" onClick={() => auth.signOut()}>LOG OUT</Button>

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
              <Typography variant="h2" component="h2" gutterBottom color="primary">
                Goal Tracker</Typography>



              <Paper
                elevation={3}
              >



                <Button variant="outlined" onClick={signInWithGoogle} color="primary" startIcon={<FcGoogle/>}>
                  Sign in with Google</Button>

              </Paper>

              
              <Divider variant="middle"
              style={{
                marginTop:"2%",
                marginBottom:"2%",
                width:"15%"
              }}
              ></Divider>


              <Paper>


                <Button variant="contained" onClick={signInWithFacebook} color="primary" startIcon={<FacebookIcon/>}>
                  Sign in with FaceBook</Button>

              </Paper>



            </Grid>







        }
      </div >
    );
  }
}


export default App;
