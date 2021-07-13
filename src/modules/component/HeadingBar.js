import React from 'react';
import {Typography,Button } from '@material-ui/core';

export default function HeadingBar (props) {
    const {title,button, variant} = props
    return (
        <div style={{display:'flex', flexDirection:'row', marginBottom:15, marginTop:30}}>
            <div style={{flex:1}}>
                <Typography variant={!variant ? 'h5' : variant} >{title}</Typography>
            </div>
            {button}
        </div>
    )
}