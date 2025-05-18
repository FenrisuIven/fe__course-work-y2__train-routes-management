import {MenuItem, Select, InputLabel, FormControl, SxProps} from "@mui/material";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";

const SearchParameter = ({options, sx}: { options: string[], sx: SxProps }) => {
  const {setSearchBy} = useNullableContext(RootStoreCtx).SearchDataStore;

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
        onChange={(e) => {
          setSearchBy(e.target.value)
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