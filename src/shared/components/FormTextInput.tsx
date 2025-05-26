import {TextField, Typography} from "@mui/material";
import {UseFormRegisterReturn, GlobalError} from "react-hook-form";

import InputMask from "@mona-health/react-input-mask";

const FormTextInput = ({label, errorField, register, inputMask}: {
  label?: string,
  errorField?: GlobalError,
  register?: UseFormRegisterReturn,
  inputMask?: string
}) => {
  return <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
      <InputMask mask={inputMask} {...register} >
        <TextField label={label} color={errorField ? 'error' : 'primary'} focused={Boolean(errorField)} />
      </InputMask>
      {errorField && <Typography color="error" variant="subtitle2">{errorField.message}</Typography>}
    </div>
  </>;
}

export {FormTextInput}