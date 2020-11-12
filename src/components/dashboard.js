import React from "react";

import Firebase from "firebase";
import { auth, db } from '../firebase';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Form
} from "@material-ui/core"

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
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <h1>Add a new goal</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            {
                                goals.map(goal => (
                                    <div key={
                                        goal.uid
                                    }
                                        className="card float-left"
                                        style={
                                            {
                                                width: "18rem",
                                                marginRight: "1rem"
                                            }
                                        }>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {
                                                    goal.gname
                                                }</h5>
                                            <p className="card-text">
                                                {
                                                    goal.gdesc
                                                }</p>
                                            <button onClick={
                                                () => this.removeData(goal)
                                            }
                                                className="btn btn-link">
                                                Delete
                                        </button>
                                            <button onClick={
                                                () => this.updateData(goal)
                                            }
                                                className="btn btn-link">
                                                Edit
                                        </button>
                                        </div>
                                    </div>
                                ))
                            } </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">


                            <form onSubmit={
                                this.handleSubmit
                            }>
                                <div className="form-row">
                                    <input type="hidden" ref="uid" />
                                    <div className="form-group col-md-6">
                                        <label>Goal</label>
                                        <TextField type="text" ref="gname"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Description</label>
                                        <input type="text" ref="gdesc" className="form-control" placeholder="description.." />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
