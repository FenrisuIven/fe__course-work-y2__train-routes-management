import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import {Chip, LinearProgress, SxProps} from "@mui/material";

const DisplayTable = ({rows, sx, status}: {
  rows: GridRowsProp,
  sx?: SxProps,
  status: {
    isLoading: boolean,
    isRefetching: boolean,
  }
}) => {
  const columnNames = Object.keys(rows?.[0] || {}).map((columnName): GridColDef => {
    return {
      field: columnName,
      headerName: columnName,
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <>
          {params.value === null ? <Chip label="NULL" sx={{borderRadius: '0', paddingTop: '3px'}} /> :
            <span>{params.value.toString()}</span>}
        </>
      }
    }
  })

  return (
    <>
      {
        (status.isLoading || status.isRefetching) ?
          <LinearProgress color="secondary" /> : <div style={{paddingTop: "4px"}} />
      }
      <DataGrid rows={rows} columns={columnNames} sx={{
        ...sx,
        border: 0,
      }} />
    </>
  );
}

export {DisplayTable}