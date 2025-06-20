import {DisplayTable} from "../../../shared/components/DisplayTable.tsx";
import useNullableContext from "../../../lib/hooks/useNullableContext.ts";
import {useQuery} from "@tanstack/react-query";
import {observer} from "mobx-react-lite";
import {fetchApiResponse} from "../../../lib/fetchApiResponse.ts";
import {useEffect, useState} from "react";
import RootStoreCtx from "../../../stores/rootStore/rootStoreCtx.ts";
import {Divider, TableBody, TableCell, TableRow} from "@mui/material";
import {NewRouteForm} from "../../../features/routes/forms/NewRouteForm/NewRouteForm.tsx";

const RoutesPage = observer(() => {
  const {
    searchValue,
    searchByOptions,
    setDisplaySearchEnv,
    setSearchByOptions
  } = useNullableContext(RootStoreCtx).SearchDataStore;
  setDisplaySearchEnv('routes');

  const {data: apiResponse, isRefetching, refetch} = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      return fetchApiResponse.get({url: 'http://localhost:3000/routes'})
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
      const values = Object.keys(apiResponse.data.rows[0] || {}).slice(1);
      setSearchByOptions(values);
    }
  }, [apiResponse?.data])

  useEffect(() => {
    console.log(searchByOptions)
  }, [searchByOptions])

  return <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem', height: '100%'}}>
      <DisplayTable
        sx={{flex: 3}}
        rows={apiResponse?.data?.rows || []}
        status={{
          isLoading: loading, isRefetching
        }}
        columnDefs={[{
          field: 'stops',
          flex: 1,
          renderCell: (params) => {
            return (
              <TableBody sx={{
                border: 0,
                '& .MuiTableCell-root': {
                  fontFamily: '"Nunito", sans-serif',
                }
              }}>
                {params.row.stops.map((stop, idx) => {
                  const borderBottom = idx === params.row.stops.length - 1 ? {borderBottom: 0} : {};
                  return (
                    <>
                      <TableRow>
                        <TableCell sx={borderBottom}> {stop.id} </TableCell>
                        <TableCell sx={{...borderBottom, width: '150px'}}> {stop.name} </TableCell>
                        <TableCell sx={borderBottom}> {stop.stationID} </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            )
          }
        }]}
      />
      <Divider />
      <div style={{display: 'flex', gap: '0.5rem', padding: '0.5rem'}}>
        <NewRouteForm />
      </div>
    </div>
  </>
})

export default RoutesPage