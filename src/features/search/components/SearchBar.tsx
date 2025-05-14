import {InputAdornment, TextField} from "@mui/material";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import SearchContext from "../context/SearchContext.ts";

import SearchIcon from '@mui/icons-material/Search';
import {SyntheticEvent} from "react";
import SearchParameter from "./SearchParameter.tsx";

const SearchBar = () => {
  const {setSearchValue, displaySearchEnv, searchByOptions} = useNullableContext(SearchContext);

  const handleClose = (e: SyntheticEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  return (
    <TextField
      fullWidth
      variant="standard"
      onBlur={handleClose}
      color="secondary"
      label={`Search in ${displaySearchEnv}`}
      slotProps={{
        input: {
          startAdornment: (
            <>
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            </>
          ),
          endAdornment: (
            <>
              <InputAdornment position="end">
                <SearchParameter options={searchByOptions} sx={{
                  marginTop: "-14px"
                }} />
              </InputAdornment>
            </>
          )
        },
      }}
    />
  );
}

export {SearchBar}