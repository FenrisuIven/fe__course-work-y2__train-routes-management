import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

const FormSelect = ({options, optionsKeyBase, id, label, registerProps}: {
  options?: { id: number, name: string }[],
  optionsKeyBase: string,
  id: string,
  label: string,
  registerProps?: object
}) => {
  return <>
    <FormControl>
      <InputLabel id={`${id}-input-label`}>{label}</InputLabel>
      <Select
        label={label}
        labelId={`${id}-input-label`}
        {...registerProps}
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