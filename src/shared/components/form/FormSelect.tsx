import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {ControllerRenderProps} from "react-hook-form";

const FormSelect = ({options, optionsKeyBase, id, label, registerProps, multiple, controllerField}: {
  options?: { id: number, name: string }[],
  optionsKeyBase: string,
  id: string,
  label: string,
  multiple?: boolean,
  registerProps?: object,
  controllerField?: ControllerRenderProps<any>
}) => {
  const props = multiple ? controllerField : registerProps;
  return <>
    <FormControl>
      <InputLabel id={`${id}-input-label`}>{label}</InputLabel>
      <Select
        label={label}
        labelId={`${id}-input-label`}
        {...props}
        multiple={multiple}
      >
        <MenuItem><Typography color="textDisabled">None</Typography></MenuItem>
        {options?.map((entry: { id: number, name: string }) => {
          return <MenuItem key={`${optionsKeyBase}_${entry.id}`} value={entry.id}>
            {`${entry.id}: ${entry.name}`}
          </MenuItem>
        })}
      </Select>
    </FormControl>
  </>
}

export {FormSelect};