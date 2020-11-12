import React from "react";

import Firebase from "firebase";
import { auth, db } from '../firebase';
import {
    Grid,
    TextField,
    Button,
    Typography,
} from "@material-ui/core"
import Form from 'react-bootstrap/Form'

class Dashboard extends React.Component {
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

        if (uid && gname && gdesc) {
            const { goals } = this.state;
            const devIndex = goals.findIndex(data => {
                return data.uid === uid;
            });
            goals[devIndex].gname = gname;
            goals[devIndex].gdesc = gdesc;
            this.setState({ goals });
        } else if (gname && gdesc) {
            const uid = new Date().getTime().toString();
            const { goals } = this.state;
            goals.push({ uid, gname, gdesc });
            this.setState({ goals });
        }

        this.refs.gname.value = "";
        this.refs.gdesc.value = "";
        this.refs.uid.value = "";
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
    };

    render() {
        const { goals } = this.state;
        return (
            <React.Fragment>
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
                                <Typography variant="h4" gutterBottom color="primary">
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
                                    <Form.Control type="date" ref="gdate" className="form-control" placeholder="Enter deadline" />


                                </Typography>
                                <Typography gutterBottom>
                                <Button variant="outlined" type="submit" color="primary">
                                    Save
                                </Button>

                                </Typography>
                                

                            </Grid>

                        </Form>
                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default Dashboard;
