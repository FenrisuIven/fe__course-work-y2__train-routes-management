import {DisplayTable} from "../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";
import {useQuery} from "@tanstack/react-query";
import {observer} from "mobx-react-lite";
import {fetchApiResponse} from "../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import RootStoreCtx from "../../stores/rootStore/rootStoreCtx.ts";
import {TempViewStationPos} from "../../features/station/forms/TempViewStationPos.tsx";

const StationPage = observer(() => {
  const {
    searchValue,
    searchByOptions,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('stations');

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/station'}),
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
      console.log({apiResponse})
      const values = Object.keys(apiResponse.data.rows[0] || {}).slice(1);
      setSearchByOptions(values);
    }
  }, [apiResponse?.data])

  useEffect(() => {
    console.log(searchByOptions)
  }, [searchByOptions])

  return <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
      <DisplayTable
        sx={{flex: 3}}
        rows={apiResponse?.data?.rows || []}
        status={{
          isLoading: loading, isRefetching
        }}
      />
      <TempViewStationPos />
    </div>
  </>
})

export default StationPage