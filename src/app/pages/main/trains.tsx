import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import {useEffect, useState} from "react";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useQuery} from "@tanstack/react-query";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {observer} from "mobx-react-lite";
import {AddTrainForm} from "../../../features/train/forms/AddTrainForm.tsx";
import {Divider, Switch} from "@mui/material";
import {TrainData} from "../../../features/train/types/TrainData.ts";
import {GridColDef} from "@mui/x-data-grid";

const TrainsPage = observer(() => {
  const {searchValue, setDisplaySearchEnv, setSearchByOptions} = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('trains')

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/train'}),
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
      const values = Object.keys(apiResponse.data.rows[0]).filter(key => !key.toLowerCase().includes('id'));
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