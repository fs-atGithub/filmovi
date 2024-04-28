import React from 'react';
import { Grid, useTheme } from '@mui/material';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;
  const theme = useTheme();
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 10,
        overflow: 'auto',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
        },
      }}
    >
      {movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
};

export default MovieList;
