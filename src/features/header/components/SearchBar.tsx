import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {Fragment, useEffect, useState} from "react";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";

const SearchBar = () => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/train'}),
    enabled: false,
  });

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[] | null>([]);

  const handleOpen = () => {
    setOpen(true);
    refetch().catch((e) => {
      console.log('SearchBar refetch error', e)
    });
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data?.data) {
      setOptions(data.data.map((item) => {
        return `${item.id}: ${item.name} [${!item.active ? 'in' : ''}active] ${(item.active && item.voyageID) ? `Voyage: ${item.voyageName}` : ''}`.trim();
      }));
    }
  }, [data]);

  return (
    <Autocomplete
      sx={{flex: 1}}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          fullWidth
          variant="standard"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}

export {SearchBar}