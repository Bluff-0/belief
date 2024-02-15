import React, { useState } from "react";
import SpotifyLogin from "./login/SpotifyLogin";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from "./components/Home";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: { 
    fontFamily: ["Montserrat", "sans-serif"].join(",") 
  }
});

const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => setToken(sessionStorage.getItem('spotify_token')), [])
  return (
    (token == null) ? (<SpotifyLogin setToken={setToken} />) :
      (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      )
  );
};

export default App;