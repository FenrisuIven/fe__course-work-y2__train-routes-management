import Axios from 'axios';
import {useEffect, useState} from "react";

import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';

const DisplayTable = () => {
  const [data, setData] = useState<GridRowsProp>()

  useEffect(() => {
    Axios.get("http://localhost:3000")
      .then((response) => {
        const rows: object[] = response.data;
        if (Array.isArray(rows) && rows.length > 0 && Object.keys(rows[0]).length > 0) {
          setData(rows);
        }
      })
      .catch((e) => console.log(e))
  }, []);

  useEffect(() => {
    if (data) {
      console.log({data})
    }
  }, [data])

  return <></>
}

export {DisplayTable}