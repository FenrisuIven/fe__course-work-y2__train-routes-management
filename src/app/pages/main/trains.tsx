import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import {useEffect, useState} from "react";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useQuery} from "@tanstack/react-query";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {observer} from "mobx-react-lite";
import {AddTrainForm} from "../../../features/train/forms/AddTrainForm.tsx";
import {Divider, Switch} from "@mui/material";
import {GridColDef} from "@mui/x-data-grid";

const TrainsPage = observer(() => {
  const {
    searchBy,
    searchValue,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('trains');

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      const url = searchValue && searchBy ?
        `http://localhost:3000/train/find?value=${searchValue}&inColumn=${searchBy}`
        : 'http://localhost:3000/train';
      return fetchApiResponse.get({url});
    },
    enabled: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      refetch().catch((e) => {
        console.log('SearchBar refetch error', e)
      });
      setLoading(false);
    }, 1000)
  }, [searchValue]);

  useEffect(() => {
    if (apiResponse?.data) {
      const rows = searchValue && searchBy ? apiResponse?.data : apiResponse?.data?.rows;
      if (!rows || !rows[0]) return;
      const values = Object.keys(rows[0] || {}).slice(1);
      setSearchByOptions(values);
    }
  }, [apiResponse?.data])

  return <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem', height: '100%'}}>
      <DisplayTable
        sx={{flex: 3}}
        rows={apiResponse?.data?.rows || []}
        status={{
          isLoading: loading, isRefetching
        }}
        columnDefs={[
          {
            field: 'active',
            headerName: 'active',
            width: 150,
            renderCell: (value: GridColDef) => {
              return <Switch defaultChecked={value.row.active} onChange={(e) => {
                console.log(`Train ${value.row.id} active status changed to: ${e.target.checked}`);
              }} />
            }
          }
        ]}
      />
      <Divider />
      <div style={{display: 'flex', gap: '0.5rem', padding: '0.5rem'}}>
        <AddTrainForm />
      </div>
    </div>
  </>;
})

export default TrainsPage;