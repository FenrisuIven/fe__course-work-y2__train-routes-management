import {MenuItem, Select, InputLabel, FormControl, SxProps} from "@mui/material";

const SearchParameter = ({options, sx}: { options: string[], sx: SxProps }) => {
  return (
    <FormControl variant="standard" size="small" sx={sx}>
      <InputLabel id="search-parameter-label">Search by</InputLabel>
      <Select
        labelId="search-parameter-label"
        id="search-parameter"
        label="Search by"
        sx={{
          width: "12ch",
          paddingX: "0.6rem"
        }}
      >
        {options.map(option => {
          return <MenuItem value={option}>{option}</MenuItem>
        })}
      </ Select>
    </FormControl>
  );
}

export default SearchParameter;