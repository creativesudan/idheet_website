import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Snackbar as MSnackbar } from '@material-ui/core';
import { useSelector } from 'react-redux';


export default class Snackbar extends React.Component {
    static _ref = null;

    static setRef(ref = {}) {
        Snackbar._ref = ref;
    }

    static show(options = {}) {
        Snackbar._ref.show(options);
    }

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    async show(message) {
        await this.setState({ open: true, message: message });
    }

    render() {
        const handleClose = () => {
            this.setState({ open: false });
        }
        return (
            <>
                <MSnackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    onClose={handleClose}
                    message={this.state.message}
                    autoHideDuration={6000}
                    // key={state.vertical + state.horizontal}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </>
        )
    }
}


// export default function Snackbar() {
//     // const { open, message, onClose } = props;
//     const { open, message, onClose } = useSelector(state=>state.snackbar);



//     // const { vertical, horizontal, open } = state;



//     // console.log(props);

//     return (
//         <>
//             <MSnackbar
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//                 open={open}
//                 onClose={onClose}
//                 message={message}
//                 autoHideDuration={6000}
//                 // key={state.vertical + state.horizontal}
//                 action={
//                     <React.Fragment>
//                         <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
//                             <CloseIcon fontSize="small" />
//                         </IconButton>
//                     </React.Fragment>
//                 }
//             />
//         </>
//     )
// }