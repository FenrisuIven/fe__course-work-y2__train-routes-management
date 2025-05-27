import {Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import {PropsWithChildren, useState} from "react";
import {DialogFormParams} from "../types";
import {APIResponse} from "../types/APIResponse.ts";

const DialogFormContainer = ({children, buttons, title, className, onSubmit}: DialogFormParams & PropsWithChildren) => {
  const [open, setOpen] = useState(true);

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

              if (status?.isInputValid) {
                if (onSubmit) {
                  const response: APIResponse = await onSubmit();
                  if (response.error) {
                    console.error('Error submitting form:', response);
                    return;
                  }
                }
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