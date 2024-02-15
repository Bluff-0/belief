import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Topbar from './Topbar';
import Body from './Body';
import Footer from './Footer';
import { getUser } from '../functions/user';

export default function Home() {

  const [user, setUser] = useState({});

  useEffect(() => { getUser(setUser); }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Topbar user={user} />
      <Body user={user}/>
      <Footer />
    </Box>

  );
}
