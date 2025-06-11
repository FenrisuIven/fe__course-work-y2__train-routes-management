import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Divider, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router";
import {MouseEvent, useState} from "react";

const FeaturesMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton
      size="large"
      edge="end"
      aria-label="more"
      sx={{ml: 2, gap: '2rem'}}
      onClick={handleClick}
    >
      <MoreVertIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem><NavLink to="/api-features/lookup-transfers">Lookup Transfers</NavLink></MenuItem>
      <Divider />
    </Menu>
  </>
}

export {FeaturesMenu};