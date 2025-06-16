import {TextField, Typography} from "@mui/material";
import {UseFormRegisterReturn, GlobalError} from "react-hook-form";

import InputMask from "@mona-health/react-input-mask";

const FormTextInput = ({label, errorField, register, inputMask, value}: {
  label?: string,
  errorField?: GlobalError,
  register?: UseFormRegisterReturn,
  inputMask?: string,
  value?: string | number
}) => {
  return <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
      <InputMask mask={inputMask} {...register} value={value}>
        <TextField label={label} color={errorField ? 'error' : 'primary'} focused={Boolean(errorField)} />
      </InputMask>
      {errorField && <Typography color="error" fontSize='0.8rem'>{errorField.message}</Typography>}
    </div>
  </>;
}

export {FormTextInput}