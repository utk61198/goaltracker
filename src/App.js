// App.js
import React from 'react';

import { signInWithGoogle } from './firebase';
import {auth} from './firebase';

import { Grid,Button ,makeStyles,Paper,Typography} from '@material-ui/core';




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
                <Paper
                elevation={3}
                style={{height:"50vh",marginTop:"10%"}}>
                 <Grid
  container
  direction="column"
  justify="space-between"
  alignItems="center"
  style={{marginTop:"10px"}}
  

>
                
                
                {/* <img src={this.state.currentUser.photoURL} /> */}
              
                <Typography variant="h6" component="h2" gutterBottom color="primary">

              Name: {this.state.currentUser.displayName}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom color="primary">

              Email: {this.state.currentUser.email}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom color="primary">

uid: {this.state.currentUser.uid}
</Typography>

              <Button variant="outlined" color="primary" onClick={() => auth.signOut()}>LOG OUT</Button>
              </Grid>
              </Paper>
            
            </div>
            ) :

           
               <Grid
  container
  direction="column"
  justify="space-between"
  alignItems="center"
  style={{marginTop:"10%"}}

>
<Typography variant="h2" component="h2" gutterBottom color="primary">
  Goal Tracker
</Typography>



<Paper
            elevation={3}
            >

       

  <Button variant="outlined" onClick={signInWithGoogle} color="primary">
  Sign in with Google
</Button>
</Paper>



</Grid>

             
           


           

        }
      </div >
    );
  }
}


export default App;
