import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavDrawer from './NavDrawer';
import AddEvent from './AddEvent';
import PastEvents from './PastEvents';
import Tags from './Tags';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';




class PastEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentEvent : props.parentEvent,
           
          
        }

    }


    render() {
        return (
            <div className='fullPage' style={{ width: "400px"}}>

                <Grid container direction="column" style={{margin : "10px"}}>

                    <Typography variant="h6">
                        {this.state.parentEvent.getTitle()} : {this.state.parentEvent.getDate()}
                    </Typography>

                    <Grid container item direction="column" direction="row"
                        justify="space-between"
                        alignItems="flex-start">

                        <Grid item>
                        
                        <Typography variant="subtitle1">
                                    Total Attendence : {this.state.parentEvent.getAttend()}
                                </Typography>
                        
                        </Grid>

                        
    
    
    
                    </Grid>


                    <Grid container item direction="column" direction="row"
                        justify="space-between"
                        alignItems="flex-start">
                        <Grid item>
                        <Typography variant="subtitle2">
                                        Number Freshman : {this.state.parentEvent.getFresh()}
                                    </Typography>
                        
                        </Grid>

                        <Grid item>
                        <Typography variant="subtitle2">
                                    Number Sophmores : {this.state.parentEvent.getSoph()}
                                </Typography>
                        
                        </Grid>

                       
    
    
    
                    </Grid>

                    <Grid container item direction="column" direction="row"
                        justify="space-between"
                        alignItems="flex-start">

                        <Grid item>
                        <Typography variant="subtitle2">
                                    Number Juniors : {this.state.parentEvent.getJun()}
                                </Typography>
                        
                        </Grid>
                        <Typography variant="subtitle2">
                                    Number Seniors : {this.state.parentEvent.getSen()}
                                </Typography>
                        
                        </Grid>
                        <Grid item>
                        

    
    
    
                    </Grid>


                </Grid>






            </div>

        );
    }
}




export default PastEvent;
