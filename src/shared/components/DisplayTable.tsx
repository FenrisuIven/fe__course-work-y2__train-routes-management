import Axios from 'axios';
import {useQuery} from "@tanstack/react-query";

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {LinearProgress, SxProps} from "@mui/material";

const DisplayTable = ({sx}: { sx?: SxProps }) => {
  const {isLoading, isRefetching, data: trainData} = useQuery({
    queryKey: ['trains'],
    queryFn: () => {
      return Axios.get("http://localhost:3000/train?include=tracker&remap")
    },
  });

  const columnNames = Object.keys(trainData?.data?.[0] || {}).map((columnName): GridColDef => {
    return {
      field: columnName,
      headerName: columnName,
      width: 150,
    }
  })

  return (
    <>
      {(isLoading || isRefetching) && <LinearProgress />}
      <DataGrid rows={trainData?.data || []} columns={columnNames} sx={sx} />
    </>
  );
}

export {DisplayTable}