import {CircularProgress, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {Fragment, useEffect, useState} from "react";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";

const SearchBar = () => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/train'}),
    enabled: false,
  });

  const [options, setOptions] = useState<readonly string[]>([]);

  const handleClose = () => {
    refetch().catch((e) => {
      console.log('SearchBar refetch error', e)
    });
  };

  useEffect(() => {
    if (data?.data) {
      setOptions(data.data.map((item) => {
        return `${item.id}: ${item.name} [${!item.active ? 'in' : ''}active] ${(item.active && item.voyageID) ? `Voyage: ${item.voyageName}` : ''}`.trim();
      }));
    } else {
      setOptions([]);
    }
  }, [data]);

  useEffect(() => console.log(options), [options]);

  return (
    <TextField
      hiddenLabel
      fullWidth
      variant="standard"
      onBlur={handleClose}
      slotProps={{
        input: {
          startAdornment: (
            <Fragment>
              {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
            </Fragment>
          ),
        },
      }}
    />
  );
}

export {SearchBar}