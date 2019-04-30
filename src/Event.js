import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import queryString from 'query-string';
import firebase from './config';
import CircularProgress from '@material-ui/core/CircularProgress';

class Event extends Component {

    state = {text: "Checking In...", hidden: "visible"};

    constructor(props) {
        super(props);
        this.values = queryString.parse(this.props.location.search);
        this.checkIn();
    }

    checkIn() {
        let self = this;
        if (this.values.id != null && this.values.id != "" && this.values.name != null && this.values.name != "" && this.values.email != null && this.values.email != "") {
            firebase.database.ref('/current-events/' + this.values.id + '/users/' + this.values.email).set(true, function(error) {
                if (error) {
                    self.setState({ text: "There was a problem checking you in.\n\nMake sure you are signed into the Augustana Events Web App using your Augustana email and then refresh the page.", hidden: "hidden" });
                } else {
                    self.setState({ text: "Successfully checked in as " + self.values.email + ".", hidden: "hidden" });
                }
            });
        } else {
            this.values.name = "Error";
            this.state.text = "Invalid QR link.";
            this.state.hidden = "hidden";
        }
    }

    render() {
        
        return (
            <div style={{textAlign: "center", paddingTop: 40}}>
            <div style={{display: "inline-block"}}>
                <Grid container>
                <Grid item container direction="column" spacing={40}>
                    <Grid item><label style={{fontSize: 40}}>{this.values.name.replaceAll("/+", " ")}</label></Grid>
                    <Grid item><label style={{fontSize: 20}}>{this.state.text.split('\n').map((item, key) => { return <span key={key}>{item}<br/></span>})}</label></Grid>
                    <Grid item><CircularProgress style={{visibility: this.state.hidden}}></CircularProgress></Grid>
                </Grid>
                </Grid>
            </div>
            </div>
        );
    }
}

export default Event;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};