import {DisplayTable} from "./components/DisplayTable.tsx";
import {Header} from "./components/Header.tsx";
import {createTheme, ThemeProvider} from "@mui/system";

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="flex flex-col flex-nowrap">
        <DisplayTable />
        <DisplayTable />
      </div>
    </ThemeProvider>
  )
}

export {App}