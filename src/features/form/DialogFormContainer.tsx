import {Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {PropsWithChildren, useState} from "react";
import {DialogFormParams} from "../types";

const DialogFormContainer = ({children, buttons, title, className}: DialogFormParams & PropsWithChildren) => {
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
      <div className={className}>
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
          <Button
            autoFocus
            type={buttons?.confirm?.type || 'button'}
            onClick={async () => {
              const status = await buttons?.confirm?.handler();
              console.log(status);
              if (status?.isInputValid) {
                handleClose();
              }
            }}>
            {buttons?.confirm?.label || 'Confirm'}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  </>
}

export {DialogFormContainer};