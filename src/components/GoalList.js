import React from "react";

import { db } from '../firebase';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  Paper,
  Card,
  makeStyles,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  TextareaAutosize
} from "@material-ui/core"
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import goalimg from "../carouselimages/goal2.jpg"
import { AiFillEdit } from "react-icons"
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';




class List extends React.Component {


  constructor(props) {


    super(props);
    this.state = {
      goals: []
    };
  }


  componentDidMount() {
    this.getUserData();
  }

  writeUserData = () => {
    db.ref("/" + this.props.user.uid).set(this.state);
    console.log("DATA SAVED");
};


componentDidUpdate(prevProps, prevState) {
  if (prevState !== this.state) {
      this.writeUserData();
  }
}







  getUserData = () => {
    let ref = db.ref("/" + this.props.user.uid);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  removeData = goal => {
    const { goals } = this.state;
    const newState = goals.filter(data => {
        return data.uid !== goal.uid;
    });
    this.setState({ goals: newState });
};

updateData = goal => {
  // this.refs.uid.value = goal.uid;
  this.refs.gname.value = goal.gname;
  this.refs.gdesc.value = goal.gdesc;
  this.refs.gdate.value = goal.gdate
  this.refs.often.value = goal.often
};



  render() {
    const { goals } = this.state;

    return (

      <div>
        
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
                      <Button variant="outlined" size="small" color="primary" endIcon={<EditIcon />} style={{ marginBottom: "20%" }}
                      onClick={()=>this.updateData(goal)}>
                        Edit</Button>

                    </Typography>


                    <Typography gutterBottom>
                      <Button variant="contained" size="small" endIcon={<DoneAllIcon />} style={{ color: "green", fontWeight: "bold", marginBottom: "20%" }
                    }
                    onClick={()=>this.removeData(goal)}
                    >
                        Finished</Button>

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
    )



  }






}


export default List