import {createTheme} from "@mui/material";

import {palette} from "./palettes";
import {MuiAppBar} from './component-overrides'

const theme = createTheme({
    palette: {...palette},
    components: {
      ...MuiAppBar,
    }
  }
);

export {theme};