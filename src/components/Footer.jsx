import React from "react";
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DiscFullIcon from '@mui/icons-material/DiscFull';
import WebhookIcon from '@mui/icons-material/Webhook';

export default function Footer() {
    const [value, setValue] = React.useState(0);
  
    return (
      <Paper sx={{ position: 'fixed', bottom: -2, left: 0, right: 0 }} elevation={0}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Application" icon={<AcUnitIcon />} />
          <BottomNavigationAction label="About & Disclaimer" icon={<DiscFullIcon />} />
          <BottomNavigationAction label="Developer" icon={<WebhookIcon />} />
        </BottomNavigation>
      </Paper>
    );
  }