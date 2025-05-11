import {DisplayTable} from "../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../lib/hooks/useNullableContext.ts";
import SearchContext from "../../features/search/context/SearchContext.ts";
import {useEffect, useState} from "react";
import {fetchApiResponse} from "../../lib/fetchApiResponse.ts";
import {useQuery} from "@tanstack/react-query";

const TrainsPage = () => {
  const {searchValue} = useNullableContext(SearchContext);

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
    }, 2000)
  }, [searchValue]);


  return <>
    <DisplayTable
      sx={{flex: 3}}
      rows={apiResponse?.data}
      status={{
        isLoading: loading, isRefetching
      }}
    />
  </>;
}

export default TrainsPage;