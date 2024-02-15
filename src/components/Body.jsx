import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PreviewIcon from '@mui/icons-material/Preview';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { Item } from './mini/Item';
import SidePanel from './SidePanel';
import Overview from './Overview';
import Recent from './Recent';


export default function Body({ user }) {

    const [panel, handlePanel]= useState('overview');

    const panelSelection= {
        "overview": <Overview />,
        "recent": <Recent />
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} xs={12}>
                <Grid xs={9}>
                    <Item>
                        <ToggleButtonGroup value={panel} exclusive onChange={(e, _) => (_ !== null) && handlePanel(_)} aria-label="segments" style={{margin: '0 auto 5px'}} size='large' color="primary">
                            <ToggleButton value="overview" aria-label="overview"><PreviewIcon /></ToggleButton>
                            <ToggleButton value="recent" aria-label='recent'><ScheduleIcon /></ToggleButton>
                            <ToggleButton value="playlist" aria-label='playlist'><QueueMusicIcon /></ToggleButton>
                        </ToggleButtonGroup>
                        {panelSelection[panel]}
                    </Item>
                </Grid>
                <SidePanel user={user} />
            </Grid>
        </Box>

    );
}
