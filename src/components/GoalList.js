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
    CardContent
} from "@material-ui/core"
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import goalimg from "../carouselimages/goal2.jpg"
import {AiFillEdit} from "react-icons"
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



    getUserData = () => {
        let ref = db.ref("/" + this.props.user.uid);
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    };


    render() {
        const { goals } = this.state;

        return(

            <div>
                {
                
                goals.map(goal=>(
                    <div key={goal.uid}>

<Card style={{
    display:'flex',
    marginBottom:"5%",
    justifyContent:"center",
    marginLeft:"1%",
    marginRight:"1%",

}}>
      <CardActionArea style={{color:"black"}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="150"
          image={goalimg}
          
        
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            {goal.gname}

          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
            {goal.gdesc}
          </Typography>
          <Typography variant="body2" color="secondary" component="p" >
            Goal Deadline: {goal.gdate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" endIcon={<EditIcon/>}>
          Edit
        </Button>
        <Button size="small" color="primary" endIcon={<DoneAllIcon/>}>
          Finished
        </Button>
      </CardActions>
    </Card>








                        </div>

                    





                ))}
            </div>
        )



    }






}


export default List