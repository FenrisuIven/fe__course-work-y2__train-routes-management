import {observer} from "mobx-react-lite";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import {Divider} from "@mui/material";
import {NewVoyageForm} from "../../../features/voyage/forms/NewVoyageForm/NewVoyageForm.tsx";

const VoyagesPage = observer(() => {
  const {
    searchValue,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;

  setDisplaySearchEnv("voyages");

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['voyages'],
    queryFn: () => fetchApiResponse.get({url: 'http://localhost:3000/voyage'}),
    enabled: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      refetch().catch((e) => {
        console.log("VoyagesPage refetch error", e);
      });
      setLoading(false);
    }, 1000);
  }, [searchValue]);

  useEffect(() => {
    if (apiResponse?.data?.rows?.length) {
      const values = Object.keys(apiResponse.data.rows[0]).filter(
        (key) => !key.toLowerCase().includes("id")
      );
      setSearchByOptions(values);
    }
  }, [apiResponse?.data]);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "0.2rem", height: "100%"}}>
      <DisplayTable
        sx={{flex: 3}}
        rows={apiResponse?.data?.rows || []}
        status={{isLoading: loading, isRefetching}}
        columnDefs={[]}
      />
      <Divider />
      <div style={{display: "flex", gap: "0.5rem", padding: "0.5rem"}}>
        <NewVoyageForm />
      </div>
    </div>
  );
});

export default VoyagesPage