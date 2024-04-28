import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
      }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          position: 'relative', // Merged cardRoot and card styles
        }}
      >
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie.title}
          title={movie.title}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.575)',
            backgroundBlendMode: 'darken',
          }}
        />
        <Box padding="20px">
          <CardContent
            sx={{
              color: '#fff',
              width: { xs: '100%', sm: '40%' }, // Responsive width using theme breakpoints
              position: 'relative',
              backgroundColor: 'transparent',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
