import {InputAdornment, TextField} from "@mui/material";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import SearchContext from "../context/SearchContext.ts";

import SearchIcon from '@mui/icons-material/Search';
import {SyntheticEvent} from "react";

const SearchBar = () => {
  const {setSearchValue} = useNullableContext(SearchContext);

  const handleClose = (e: SyntheticEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  return (
    <TextField
      hiddenLabel
      fullWidth
      variant="standard"
      onBlur={handleClose}
      color="secondary"
      slotProps={{
        input: {
          startAdornment: (
            <>
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            </>
          ),
        },
      }}
    />
  );
}

export {SearchBar}