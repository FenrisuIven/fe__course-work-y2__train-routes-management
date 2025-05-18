import {CssBaseline, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {theme} from './features/theme'
import {RouterProvider} from "react-router";
import {router} from "./app/routing";
import {RootStoreProvider} from "./stores/rootStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  }
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootStoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RootStoreProvider>
    </QueryClientProvider>
  )
}

export {App}