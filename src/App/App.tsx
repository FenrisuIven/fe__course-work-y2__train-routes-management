import {DisplayTable} from "./components/DisplayTable.tsx";
import {Header} from "./components/Header.tsx";
import {ThemeProvider} from "@mui/material";

import {theme} from './theme'

function App() {
  return (<>
      <ThemeProvider theme={theme}>
        <Header />
        <div className="flex flex-col flex-nowrap">
          <DisplayTable />
          <DisplayTable />
        </div>
      </ThemeProvider>
    </>
  )
}

export {App}