import {InputAdornment, TextField} from "@mui/material";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";

import SearchIcon from '@mui/icons-material/Search';
import {SyntheticEvent} from "react";
import SearchParameter from "./components/SearchParameter.tsx";
import RootStoreCtx from "../../stores/rootStore/rootStoreCtx.ts";
import {observer} from "mobx-react-lite";

const SearchBar = observer(() => {
  const {
    setSearchValue,
    displaySearchEnv,
    searchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;

  const handleClose = (e: SyntheticEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  return (
    <>
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
    </>
  );
})

export {SearchBar}