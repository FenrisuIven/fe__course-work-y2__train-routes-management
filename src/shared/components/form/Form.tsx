import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {PropsWithChildren, RefObject, useState} from "react";
import {DialogFormContainer} from "./DialogFormContainer.tsx";
import {Alert, Snackbar} from "@mui/material";

const Form = <T extends object>({onSubmit, form, ref, children}: {
  onSubmit: (updateSnackbar: (status: { error: boolean, message: string }) => void) => SubmitHandler<T>,
  form: UseFormReturn<T>,
  submitButton: {
    label: string;
    type: "submit" | "button";
  },
  ref: RefObject<Record<string, any> & { close: () => void } | null>,
} & PropsWithChildren) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({open: false, message: "", severity: "success"});

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({...prev, open: false}));
  };

  const updateSnackbar = (status: { error: boolean, message: string }) => {
    setSnackbar({
      open: true,
      message: status.message,
      severity: status.error ? "error" : "success"
    });
    setTimeout(handleSnackbarClose, 3 * 1000);
  }

  return (
    <>
      <DialogFormContainer
        title="Add new voyage"
        buttons={{
          confirm: {
            label: "Add",
            type: "submit",
            handler: form.handleSubmit(onSubmit(updateSnackbar))
          },
        }}
        dialogRef={ref}
      >
        <form>
          <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem"}}>
            {children}
          </div>
        </form>
      </DialogFormContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: "bottom", horizontal: "left"}}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{width: "100%"}}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Form;