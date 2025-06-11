import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import {FeaturesMenu, NavigationMenu} from "../header/components";

const SimpleHeader = () => {
  return <>
    <AppBar position="sticky">
      <Toolbar>
        <NavigationMenu />
        <div style={{width: "100%"}} />
        <FeaturesMenu />
      </Toolbar>
    </AppBar>
  </>
}

export default SimpleHeader