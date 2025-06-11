import {useQuery} from "@tanstack/react-query";
import {Autocomplete, Button, MenuItem, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Axios from "axios";
import {useEffect, useState} from "react";
import CustomMap from "../../../features/map/CustomMap.tsx";
import {NavLink} from "react-router";
import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";

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

const LookupTransfers = () => {
  const [startStop, setStartStop] = useState<Record<string, any>>();
  const [endStop, setEndStop] = useState<Record<string, any>>();

  const {data: stops} = useQuery({
    queryKey: ['lookupTransfers_Stops'],
    queryFn: async () => {
      const response = await Axios.get<{
        error: boolean,
        status: number,
        data: { rows: Record<string, any>[], count: number } & Record<string, any>
      }>('http://localhost:3000/trainStop?include=station');
      return response.data.data;
    }
  });

  const {data: transfers, isLoading, isRefetching, refetch} = useQuery({
    queryKey: ['lookupTransfers_Transfers'],
    queryFn: async () => {
      if (!startStop || !endStop) {
        return {rows: [], count: 0};
      }
      const response = await Axios.get<{
        error: boolean,
        status: number,
        data: { rows: Record<string, any>[], count: number } & Record<string, any>
      }>(`http://localhost:3000/routes/transfers?start=${startStop.id}&end=${endStop.id}`);
      return response.data.data;
    },
    enabled: false,
  });

  useEffect(() => {
    console.log(transfers)
  }, [transfers]);

  return <>
    <div style={{padding: '1rem', display: 'flex', gap: '1rem', height: '100%'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <div style={{flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <SelectStop
            stops={stops?.rows || []}
            label="Start stop"
            selectedOption={endStop}
            setNewTarget={setStartStop}
          />
          <SelectStop
            stops={stops?.rows || []}
            label="Start stop"
            selectedOption={startStop}
            setNewTarget={setEndStop}
          />
          <Button onClick={() => refetch()}>Search</Button>
          <Button>Cancel</Button>
        </div>
        <div style={{flex: 1}}>
          <CustomMap points={stops?.rows.map(stop => {
            return {
              label: `${stop.id}: ${stop.name} (${stop.stationName})`,
              position: stop.stopPosition,
            }
          }) || []} />
        </div>
      </div>
      <div style={{flex: 3}}>
        <DisplayTable
          rows={transfers?.rows || []}
          status={{isLoading, isRefetching}}
          getRowId={() => crypto.randomUUID()}
          sx={{width: '100%'}}
          columnDefs={[{
            field: "routeStart",
            headerName: 'First route',
            flex: 2,
            renderCell: (params) => {
              console.log(params.row.routeStart)
              return (
                <TableBody sx={{
                  border: 0,
                  '& .MuiTableCell-root': {
                    fontFamily: '"Nunito", sans-serif',
                  }
                }}>
                  {params.row.routeStart.stops.map((stop, idx) => {
                    console.log({stop})
                    const borderBottom = idx === params.row.routeStart.stops.length - 1 ? {borderBottom: 0} : {};
                    return (
                      <>
                        <TableRow>
                          <TableCell sx={{...borderBottom, width: '5%'}}> {stop.id} </TableCell>
                          <TableCell sx={{...borderBottom}}> {stop.name} </TableCell>
                          <TableCell sx={{
                            ...borderBottom,
                            borderLeft: 1,
                            width: '45%'
                          }}> {stop.station.name}, {stop.station.region} </TableCell>
                        </TableRow>
                      </>
                    )
                  })}
                </TableBody>
              )
            }
          }, {
            field: 'routeEnd',
            headerName: 'Second route',
            flex: 2,
            renderCell: () => {
              return <span>2</span>
            }
          }, {
            field: 'transferStops',
            headerName: 'Transfer stops',
            flex: 1,
            renderCell: () => {
              return <span>2</span>
            }
          }]}
        />
      </div>
    </div>
  </>
}

export default LookupTransfers;