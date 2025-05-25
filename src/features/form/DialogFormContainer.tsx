import {Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {PropsWithChildren, useState} from "react";
import {DialogFormParams} from "../types";

const DialogFormContainer = ({children, buttons, title}: DialogFormParams & PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Button variant="outlined" onClick={handleClickOpen}>
      Open alert dialog
    </Button>
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          buttons?.cancel?.handler();
          handleClose();
        }}>
          {buttons?.cancel?.label || 'Cancel'}
        </Button>
        <Button onClick={() => {
          buttons?.confirm?.handler();
          handleClose();
        }} autoFocus type={buttons?.confirm?.type || 'button'}>
          {buttons?.confirm?.label || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

export {DialogFormContainer};