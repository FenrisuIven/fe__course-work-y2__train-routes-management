import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import {useQuery} from "@tanstack/react-query";
import {observer} from "mobx-react-lite";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {Divider} from "@mui/material";

const TrainStopsPage = observer(() => {
  const {
    searchValue,
    searchByOptions,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('train stops');

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/trainStop'}),
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
      const values = Object.keys(apiResponse.data.rows[0] || {}).slice(1);
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
      />
      <Divider />
      <div style={{display: 'flex', gap: '0.5rem', padding: '0.5rem'}}>
      </div>
    </div>
  </>
})

export default TrainStopsPage