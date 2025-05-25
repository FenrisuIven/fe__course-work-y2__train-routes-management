import {TextField} from "@mui/material";

const FormTextInput = ({errorField}: {
  errorField: any
}) => {
  return <>
    <div>
      <TextField></TextField>
      {errorField && <span></span>}
    </div>
  </>;
}

export {FormTextInput}