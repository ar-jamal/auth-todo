import * as React from 'react';
import { useState } from 'react';
// import Button from '../CusButton'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SigninBut(props) {
    const [open, setOpen] = useState(false);
  

    return (
        <div style={{ margin: 18 }} >
            <Button 
            variant="outlined" 
            onClick={props.onClick}
            disabled= {props.disabled}
            >
                {props.title}
            </Button>
            <Dialog
                open={props.open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"No user found"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Plz get registered to continue
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
