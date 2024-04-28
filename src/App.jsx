import React from 'react';
import { CssBaseline, Box } from '@mui/material/';
import { Routes, Route } from 'react-router-dom';
import {
  Actors,
  MovieInformation,
  Movies,
  Profile,
  NavBar,
} from './components';

export const App = () => {
  return (
    <Box
      className="root"
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      <CssBaseline />
      <NavBar />
      <Box
        className="content"
        sx={{
          flexGrow: 1,
          padding: '6em 2em 2em',
        }}
      >
        <Box
          className="toolbar"
          sx={{
            height: '70px',
          }}
        />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default App;
