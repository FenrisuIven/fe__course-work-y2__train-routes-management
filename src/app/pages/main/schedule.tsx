import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import {useQuery} from "@tanstack/react-query";
import {observer} from "mobx-react-lite";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {TempViewStationPos} from "../../../features/station/forms/TestViewStationPos/TempViewStationPos.tsx";
import {Divider} from "@mui/material";
import {AddStationForm} from "../../../features/station/forms/AddStation/AddStationForm.tsx";

const SchedulePage = observer(() => {
  const {
    searchBy,
    searchValue,
    setDisplaySearchEnv,
    setSearchByOptions,
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('schedule');

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      const url = searchValue && searchBy ?
        `http://localhost:3000/schedule/find?value=${searchValue}&inColumn=${searchBy}`
        : 'http://localhost:3000/schedule';
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
        rows={searchValue && searchBy ? apiResponse?.data || [] : apiResponse?.data?.rows || []}
        status={{
          isLoading: loading, isRefetching
        }}
      />
      <Divider />
      <div style={{display: 'flex', gap: '0.5rem', padding: '0.5rem'}}>
        <TempViewStationPos />
        <AddStationForm />
      </div>
    </div>
  </>
})

export default SchedulePage