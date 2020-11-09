// App.js
import React from 'react';
import { signInWithGoogle } from './firebase';
import {auth} from './firebase';
import { Grid,Button ,makeStyles,Paper,Typography} from '@material-ui/core';
import AddGoal from "./components/AddGoal";
import NavBar from "./components/Navbar"
import { Add } from '@material-ui/icons';
import UserDetail from './components/UserDetails';




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
                <NavBar/>
              
                <Grid
  container
  direction="column"
  justify="space-evenly"
  alignItems="center"
  style={{marginTop:"10px"}}
>      
               
   <UserDetail user={this.state.currentUser}/>

              <AddGoal/>
              <Button variant="outlined" color="primary" onClick={() => auth.signOut()} gutterBottom>LOG OUT</Button>

              </Grid>

            
            </div>
            )
            
            
            
            
            
            
            :

           
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
