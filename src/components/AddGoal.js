import React from 'react'
import {useState,useEffect} from 'react'
import { TextField,Grid,form,Button,Paper } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function AddGoal() {

const [field, setvalue] = useState();



    return (
        <div>


<Paper elevation={3}
style={{padding:"1%",marginBottom:"5%"}}>

<Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  style={{marginTop:"10%"}}
>
<form noValidate autoComplete="off">
  
<Grid
  container
  direction="row"
  justify="space-around"
  alignItems="center">
    <TextField id="outlined-basic" label="Add a Goal" variant="outlined"/>
  <TextField id="outlined-basic" label="Description" variant="outlined" />
  </Grid>

  

</form>



<Button >
  <span>
  <AddCircleIcon fontSize="large"/>
</span>
    
</Button>



</Grid>
</Paper>


            
        </div>
    )
}
