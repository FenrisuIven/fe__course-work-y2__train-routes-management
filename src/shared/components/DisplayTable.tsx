import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import {Chip, LinearProgress, SxProps} from "@mui/material";

const DisplayTable = ({rows, sx, status, columnDefs}: {
  rows: GridRowsProp,
  sx?: SxProps,
  status: {
    isLoading: boolean,
    isRefetching: boolean,
  },
  columnDefs?: GridColDef[],
}) => {
  const columnNames = Object.keys(rows?.[0] || {})
    .map((columnName): GridColDef => {
      const definition = columnDefs?.find(def => def.field === columnName);
      if (definition) {
        return definition;
      }

      return {
        field: columnName,
        headerName: columnName,
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
          let renderComponent;
          switch (true) {
            case params.value === null:
              renderComponent = <Chip label="NULL" sx={{borderRadius: '0', paddingTop: '3px'}} />
              break;
            default:
              renderComponent = <span>{params.value.toString()}</span>;
              break;
          }
          return <>
            {renderComponent}
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
      <DataGrid
        rows={rows}
        columns={columnNames}
        getRowHeight={() => 'auto'}
        sx={{
          ...sx,
          border: 0,
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
            '&:not(:has(tbody))': {py: '8px'}
          },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            '&:not(:has(tbody))': {py: '16px'}
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            '&:not(:has(tbody))': {py: '24px'}
          },
        }} />
    </>
  );
}

export {DisplayTable}