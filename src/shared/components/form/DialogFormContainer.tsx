import {Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {PropsWithChildren, useImperativeHandle, useState} from "react";
import {DialogFormParams} from "../../../features/types";

const DialogFormContainer = ({
                               children, buttons, title, className, onSubmit, dialogRef
                             }: DialogFormParams & PropsWithChildren
) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(dialogRef, () => ({close: handleClose}));

  return <>
    <Button variant="outlined" onClick={handleClickOpen}>
      {title}
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
            onClick={() => {
              buttons?.confirm?.handler();
              if (onSubmit) {
                const res = onSubmit();
                console.log({res})
                if (res.isInputValid) {
                  handleClose();
                }
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