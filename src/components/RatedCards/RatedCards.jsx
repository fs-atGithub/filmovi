import React from 'react';
import { Typography, Box } from '@mui/material';

import { Movie } from '..';

const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {data?.results.map((movie, index) => (
          <Movie key={movie.id} movie={movie} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
