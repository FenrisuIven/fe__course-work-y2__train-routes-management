import Axios from 'axios';
import {useQuery} from "@tanstack/react-query";

import {DataGrid, GridColDef} from '@mui/x-data-grid';

const DisplayTable = () => {
  const trainsState = useQuery({
    queryKey: ['trains'],
    queryFn: () => {
      return Axios.get("http://localhost:3000")
    },
  });

  const columnNames = Object.keys(trainsState?.data?.data?.[0] || {}).map((columnName): GridColDef => {
    return {
      field: columnName,
      headerName: columnName,
      width: 150,
    }
  })

  return <>
    <DataGrid rows={trainsState?.data?.data || []} columns={columnNames} />
  </>;
}

export {DisplayTable}