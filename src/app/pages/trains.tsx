import {DisplayTable} from "../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";
import {useEffect, useState} from "react";
import {fetchApiResponse} from "../../lib/fetchApiResponse.ts";
import {useQuery} from "@tanstack/react-query";
import RootStoreCtx from "../../stores/rootStore/rootStoreCtx.ts";
import {observer} from "mobx-react-lite";

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
      const values = Object.keys(apiResponse.data[0]).filter(key => !key.toLowerCase().includes('id'));
      setSearchByOptions(values);
    }
  }, [apiResponse?.data])

  return <>
    <DisplayTable
      sx={{flex: 3}}
      rows={apiResponse?.data}
      status={{
        isLoading: loading, isRefetching
      }}
    />
  </>;
})

export default TrainsPage;