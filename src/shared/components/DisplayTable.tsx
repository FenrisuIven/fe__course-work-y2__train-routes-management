import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import {Chip, LinearProgress, SxProps} from "@mui/material";
import {ReactNode} from "react";

const DisplayTable = ({rows, sx, status, renderCells}: {
  rows: GridRowsProp,
  sx?: SxProps,
  status: {
    isLoading: boolean,
    isRefetching: boolean,
  },
  renderCells?: {
    columnName: string,
    component: (targetEntity: any) => ReactNode
  }[]
}) => {
  const columnNames = Object.keys(rows?.[0] || {}).map((columnName): GridColDef => {
    return {
      field: columnName,
      headerName: columnName,
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        let renderComponent;
        const cellParam = renderCells?.find(cell => cell.columnName === params.field);
        const targetEntity = {...params.row};
        
        switch (true) {
          case params.value === null:
            renderComponent = <Chip label="NULL" sx={{borderRadius: '0', paddingTop: '3px'}} />
            break;
          case Boolean(cellParam):
            renderComponent = cellParam?.component(targetEntity);
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
      <DataGrid rows={rows} columns={columnNames} sx={{
        ...sx,
        border: 0,
      }} />
    </>
  );
}

export {DisplayTable}