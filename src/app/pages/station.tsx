import {DisplayTable} from "../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";
import {useQuery} from "@tanstack/react-query";
import {observer} from "mobx-react-lite";
import {fetchApiResponse} from "../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import RootStoreCtx from "../../stores/rootStore/rootStoreCtx.ts";

const StationPage = observer(() => {
  const {
    searchValue,
    searchByOptions,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('station');

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
      const values = Object.keys(apiResponse.data[0]).slice(1);
      setSearchByOptions(values);
    }
  }, [apiResponse?.data])

  useEffect(() => {
    console.log(searchByOptions)
  }, [searchByOptions])

  return <>
    <DisplayTable
      sx={{flex: 3}}
      rows={apiResponse?.data}
      status={{
        isLoading: loading, isRefetching
      }}
    />
  </>
})

export default StationPage