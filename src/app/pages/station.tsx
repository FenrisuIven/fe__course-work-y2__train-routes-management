import {DisplayTable} from "../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";
import SearchContext from "../../features/search/context/SearchContext.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchApiResponse} from "../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";

const StationPage = () => {
  const {searchValue, setDisplaySearchEnv, setSearchByOptions} = useNullableContext(SearchContext);
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
    }, 2000)
  }, [searchValue]);

  useEffect(() => {
    if (apiResponse?.data) {
      const values = Object.keys(apiResponse.data[0]).slice(1);
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
  </>
}

export default StationPage