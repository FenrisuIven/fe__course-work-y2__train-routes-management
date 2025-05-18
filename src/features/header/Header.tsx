import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {SearchBar} from '../search/SearchBar.tsx';

const Header = () => {
  return (<>
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{mr: 2}}
        >
          <MenuIcon />
        </IconButton>
        <SearchBar />
      </Toolbar>
    </AppBar>
  </>);
}

export {Header}