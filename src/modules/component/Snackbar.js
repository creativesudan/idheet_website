import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Snackbar as MSnackbar } from '@material-ui/core';

export default function Snackbar(props) {
    const { open, message, onClose } = props;



    // const { vertical, horizontal, open } = state;



    // console.log(props);

    return (
        <>
            <MSnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                onClose={onClose}
                message={message}
                autoHideDuration={6000}
                // key={state.vertical + state.horizontal}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    )
}