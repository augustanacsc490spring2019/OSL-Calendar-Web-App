import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from "./config";
import { Link } from "react-router-dom";

// File for the navigation drawer (the menu that pops out when clicking the left menu button in the app bar)

class NavDrawer extends Component {

    constructor(props) {
        super(props);
        this.homeClicked = this.homeClicked.bind(this);
        this.eventClicked = this.eventClicked.bind(this);
        this.pendingClicked = this.pendingClicked.bind(this);
        this.currentClicked = this.currentClicked.bind(this);
        this.pastClicked = this.pastClicked.bind(this);
        this.tagsClicked = this.tagsClicked.bind(this);
        this.usersClicked = this.usersClicked.bind(this);
        this.state = {
            adminSignedIn: false,
            leaderSignedIn: false
        };
    }

    // Actions for when each menu item is clicked
    homeClicked() {
        this.props.navChanged("Home");
    }

    eventClicked() {
        this.props.navChanged("Add Event");
    }

    pendingClicked() {
        this.props.navChanged("Pending Events");
    }

    currentClicked() {
        this.props.navChanged("Current Events");
    }

    pastClicked() {
        this.props.navChanged("Past Events");
    }

    tagsClicked() {
        this.props.navChanged("Groups/Tags");
    }

    usersClicked() {
        this.props.navChanged("Users");
    }

    // Checks the role of the current user
    checkRole(user, role) {
        let self = this;
        firebase.database.ref(role).once('value').then(function(snapshot) {
            if (snapshot.hasChild(user.email.replace('.', ','))) {
                if (role === 'admin') {
                    self.setState({ adminSignedIn: true });
                } else if (role === 'leaders') {
                    self.setState({ leaderSignedIn: true });
                }
            }
          });
    }

    // Component will mount - initiate the Firebase auth listener
    componentWillMount() {
        firebase.auth.onAuthStateChanged((user) => {
          if (user) {
              this.checkRole(user, 'admin');
              this.checkRole(user, 'leaders');
          } else {
            this.setState({ adminSignedIn: false, leaderSignedIn: false });  
          }
        });
    }

    // Render the drawer
    render() {
        return (
            <Drawer
                open={this.props.drawerOpened}
                onClose={this.props.toggleDrawer(false)}
                anchor="left">
                <div
          onClick={this.props.toggleDrawer(false)}
          onKeyDown={this.props.toggleDrawer(false)}
        >
                <MenuList>
                    <MenuItem name="Home" onClick={this.homeClicked}>Home</MenuItem>
                    <MenuItem name="Add Event" onClick={this.eventClicked} disabled={!this.state.adminSignedIn && !this.state.leaderSignedIn}>Add Event</MenuItem>
                    <MenuItem name="Pending Events" onClick={this.pendingClicked} disabled={!this.state.adminSignedIn && !this.state.leaderSignedIn}>Pending Events</MenuItem>
                    <MenuItem name="Current Events" onClick={this.currentClicked} disabled={!this.state.adminSignedIn && !this.state.leaderSignedIn}>Current Events</MenuItem>
                    <MenuItem name="Past Events" onClick={this.pastClicked} disabled={!this.state.adminSignedIn}>Past Events</MenuItem>
                    <MenuItem name="Groups/Tags" onClick={this.tagsClicked} disabled={!this.state.adminSignedIn && !this.state.leaderSignedIn}>Groups/Tags</MenuItem>
                    <MenuItem name="Users" onClick={this.usersClicked} disabled={!this.state.adminSignedIn}>Users</MenuItem>
                </MenuList>
                </div>
            </Drawer>


            );
    }
}

export default NavDrawer;