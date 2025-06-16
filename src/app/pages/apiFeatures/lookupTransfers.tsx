import {useQuery} from "@tanstack/react-query";
import {Button, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Axios from "axios";
import {useEffect, useState} from "react";
import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import {SelectStop} from "../../../features/lookupTransfers/components/SelectStop.tsx";
import {GridRenderCellParams} from "@mui/x-data-grid";

const getParamsHeaderNames = (row) => {
  console.log({row})
  return Object.entries(row[0] || {})
    .filter((pair) => typeof pair[1] !== 'object')
    .map(pair => pair[0])
}

const TrainStopHeader = ({params}: { params: GridRenderCellParams }) => {
  return <>
    <TableHead>
      <TableRow>
        {getParamsHeaderNames(params).map(name => {
          return <TableCell>{name}</TableCell>
        })}
      </TableRow>
    </TableHead>
  </>
}

const TrainStopRow = ({borderBottom, stop}: {
  borderBottom: Record<string, any>,
  stop: { id: number, name: string, station: { name: string, region: string } }
}) => {
  return <>
    <TableRow>
      <TableCell sx={{...borderBottom, width: '5%'}}> {stop.id} </TableCell>
      <TableCell sx={{
        ...borderBottom,
        borderLeft: 1
      }}> {stop.name} </TableCell>
      <TableCell sx={{
        ...borderBottom,
        borderLeft: 1,
        width: '45%'
      }}> {stop.station.name}, {stop.station.region} </TableCell>
    </TableRow>
  </>
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
      </div>
      <div style={{flex: 4}}>
        <DisplayTable
          rows={transfers?.rows || []}
          status={{isLoading, isRefetching}}
          getRowId={() => crypto.randomUUID()}
          sx={{width: '100%'}}
          columnDefs={[{
            field: "routeStart",
            headerName: 'First route',
            flex: 1,
            renderCell: (params) => {
              return (
                <>
                  <TrainStopHeader params={params.row.routeStart.stops} />
                  <TableBody sx={{
                    border: 0,
                    '& .MuiTableCell-root': {
                      fontFamily: '"Nunito", sans-serif',
                    }
                  }}>
                    {params.row.routeStart.stops.map((stop, idx) => {
                      const borderBottom = idx === params.row.routeStart.stops.length - 1 ? {borderBottom: 0} : {};
                      return <TrainStopRow borderBottom={borderBottom} stop={stop} />
                    })}
                  </TableBody>
                </>
              )
            }
          }, {
            field: 'routeEnd',
            headerName: 'Second route',
            flex: 1,
            renderCell: (params) => {
              return (
                <>
                  <TrainStopHeader params={params.row.routeEnd.stops} />
                  <TableBody sx={{
                    border: 0,
                    '& .MuiTableCell-root': {
                      fontFamily: '"Nunito", sans-serif',
                    }
                  }}>
                    {params.row.routeEnd.stops.map((stop, idx) => {
                      const borderBottom = idx === params.row.routeEnd.stops.length - 1 ? {borderBottom: 0} : {};
                      return <TrainStopRow borderBottom={borderBottom} stop={stop} />
                    })}
                  </TableBody>
                </>
              )
            }
          }, {
            field: 'transferStops',
            headerName: 'Transfer stops',
            flex: 1,
            renderCell: (params) => {
              return (
                <>
                  <TrainStopHeader params={params.row.transferStops} />
                  <TableBody sx={{
                    border: 0,
                    '& .MuiTableCell-root': {
                      fontFamily: '"Nunito", sans-serif',
                    }
                  }}>
                    {params.row.transferStops.map((stop, idx) => {
                      const borderBottom = idx === params.row.transferStops.length - 1 ? {borderBottom: 0} : {};
                      return <TrainStopRow borderBottom={borderBottom} stop={stop} />
                    })}
                  </TableBody>
                </>
              )
            }
          }]}
        />
      </div>
    </div>
  </>
}

export default LookupTransfers;