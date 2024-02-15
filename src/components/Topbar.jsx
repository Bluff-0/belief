import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { logOut } from '../functions/handleException';

export default function Topbar({user}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NoiseControlOffIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <b>Belief</b>
          </Typography>
          <Avatar alt={user.name} src={user.image} /> &emsp;
          <Button variant="outlined" onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>

  );
}
