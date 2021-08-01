import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Button } from '@material-ui/core';
import classNames from 'classnames';



const useStyles = makeStyles((theme) => ({
    badge: {textTransform:'capitalize', padding:'5px 10px', borderRadius:4, fontSize:12, display:'inline-block'},
    color_1: {
        background: theme.palette.secondary.main,
        color:'#fff',
    },
    color_2: {
        background: '#fb522c',
        color:'#fff',
    },
    defaultColor: {
        background: theme.palette.primary.main,
        color:'#fff'
    },
}))

export default function CustomBadge (props) {
    const classes = useStyles();

    const {children, size,color} = props

    const Class = classNames(classes.badge, 
        size === 'small' && classes.small, 
        color === 1 ? classes.color_1 : color ===2 ? classes.color_2 : color ===3 ? classes.color_3 : classes.defaultColor
        )
    
    return (
        <div className={Class}>
            {children}
        </div>
    )
}