import {Autocomplete, MenuItem, TextField} from "@mui/material";

const textFieldsSlotProps = {
  inputLabel: {shrink: true}
}

const SelectStop = ({stops, label, selectedOption, setNewTarget}: {
  stops: Record<string, any>[],
  label: string,
  selectedOption: Record<string, any> | undefined;
  setNewTarget: (value) => void
}) => {
  return (
    <Autocomplete
      disablePortal
      options={stops}
      onChange={(e, val) => {
        setNewTarget(val);
      }}
      renderInput={(p) =>
        <TextField {...p} slotProps={textFieldsSlotProps} label={label} />
      }
      renderOption={(props, option) => {
        const {key, ...optionsProps} = props;
        return <MenuItem key={key} {...optionsProps}>{option.id}: {option.name} ({option.stationName})</MenuItem>;
      }}
      getOptionLabel={(option) => {
        return `${option.id}: ${option.name} (${option.stationName})`
      }}
      getOptionDisabled={(option) => {
        return option.id === selectedOption?.id;
      }}
    />
  )
}

export {SelectStop};