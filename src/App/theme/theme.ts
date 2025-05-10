import {createTheme} from "@mui/material";

import {palette} from "./palettes";
import {MuiAppBar} from './components'

const theme = createTheme({
    palette: {...palette},
    components: {
      ...MuiAppBar,
    }
  }
);

export {theme};