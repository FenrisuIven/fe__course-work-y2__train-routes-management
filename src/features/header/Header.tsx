import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {SearchBar} from '../search/SearchBar.tsx';
import {Divider, Menu, MenuItem} from "@mui/material";
import {useState, MouseEvent} from "react";
import {NavLink} from "react-router";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{mr: 2}}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem><NavLink to="/trains">Trains</NavLink></MenuItem>
          <MenuItem><NavLink to="/stations">Stations</NavLink></MenuItem>
          <MenuItem><NavLink to="/routes">Routes</NavLink></MenuItem>
          <MenuItem><NavLink to="/voyages">Voyages</NavLink></MenuItem>
          <Divider />
          <MenuItem disabled><NavLink to="/#">Schedules</NavLink></MenuItem>
          <MenuItem disabled><NavLink to="/#">Train stops</NavLink></MenuItem>
          <MenuItem disabled><NavLink to="/#">Trackers</NavLink></MenuItem>
        </Menu>
        <SearchBar />
      </Toolbar>
    </AppBar>
  </>);
}

export {Header}