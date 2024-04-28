import React, { useState } from 'react';
import { Box, useTheme, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../../features/currentGenreOrCategory';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      // Added check for non-empty query
      dispatch(searchMovie(query)); // Dispatch the action with the query
    }
  };
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
        ...(theme.breakpoints.down('sm') && {
          display: 'flex',
          justifyContent: 'center',
          width: 'cover',
        }),
      }}
    >
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id="search"
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'inherit',
            filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'inherit',
          },
        }}
        sx={{
          '& .MuiInput-underline:before': {
            borderBottomColor: 'inherit',
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'inherit',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'inherit',
          },
          [theme.breakpoints.down('sm')]: {
            marginTop: '-10px',
            marginBottom: '10px',
          },
        }}
      />
    </Box>
  );
};

export default Search;
