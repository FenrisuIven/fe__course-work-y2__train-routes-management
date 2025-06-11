import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {SearchBar} from '../search/SearchBar.tsx';
import {NavigationMenu, FeaturesMenu} from "./components";

const Header = () => {
  return (<>
    <AppBar position="sticky">
      <Toolbar>
        <NavigationMenu />
        <SearchBar />
        <FeaturesMenu />
      </Toolbar>
    </AppBar>
  </>);
}

export {Header}