import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class NavDrawer extends Component {

    constructor(props) {
        super(props);
        this.eventClicked = this.eventClicked.bind(this);
        this.currentClicked = this.currentClicked.bind(this);
        this.pastClicked = this.pastClicked.bind(this);
        this.tagsClicked = this.tagsClicked.bind(this);
    }

    eventClicked() {
        this.props.navChanged("Add Event");
    }

    currentClicked() {
        this.props.navChanged("Current Events");
    }

    pastClicked() {
        this.props.navChanged("Past Events");
    }

    tagsClicked() {
        this.props.navChanged("Tags");
    }


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
                    <MenuItem name="Add Event" onClick={this.eventClicked}>Add Event</MenuItem>
                    <MenuItem name="CurrentEvents" onClick={this.currentClicked}>Current Events</MenuItem>
                    <MenuItem name="PastEvents" onClick={this.pastClicked}>Past Events</MenuItem>
                    <MenuItem name="Tags" onClick={this.tagsClicked}>Tags/Groups</MenuItem>

                </MenuList>
                </div>
            </Drawer>


            );
    }
}

export default NavDrawer;