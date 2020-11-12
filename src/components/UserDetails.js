import React from 'react'
import { Grid,Button ,makeStyles,Paper,Typography} from '@material-ui/core';


export default function UserDetail(props) {
    console.log(props+"hello is this working")
    return (
        <div>


            <Paper elevation={3}
            style={{padding:"5px",marginBottom:"5%"}}>


<Typography align="center" gutterBottom>
<img src={props.user.photoURL} />

</Typography>
              
              <Typography variant="h6" component="h2" gutterBottom color="primary">

           Name: {props.user.displayName}
           </Typography>
           <Typography variant="h6" component="h2" gutterBottom color="primary">

           Email: {props.user.email}
           </Typography>
           <Typography variant="h6" component="h2" gutterBottom color="primary">

uid: {props.user.uid}
</Typography>

</Paper>
            
        </div>
    )
}
