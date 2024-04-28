import React, { useState } from 'react';
import { Grid, Grow, Typography, Rating, Tooltip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import placeholderImage from '../../assets/images/Filmpire.jpg'; // Ensure this path is correct

const Movie = ({ movie, index }) => {
  const theme = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  // Calculate timeout based on index to stagger the appearance of movie cards
  const calculatedTimeout = Number.isFinite(index) ? (index + 1) * 250 : 500;

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents looping
    e.target.src = placeholderImage;
    setIsHovering(false); // Reset hover state when switching to placeholder
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: '10px' }}>
      <Grow in key={index} timeout={calculatedTimeout}>
        <Link
          to={`/movie/${movie.id}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontWeight: 'bolder',
            textDecoration: 'none',
            cursor: 'pointer',
            position: 'relative', // For positioning the hover text
          }}
        >
          <Box
            component="img"
            onError={handleImageError}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : placeholderImage
            }
            alt={movie.title}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              width: 230, // Fixed width for all images
              height: 345, // Fixed height for all images
              borderRadius: '20px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              mb: 1,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              objectFit: 'cover', // Ensures the image covers the area well
            }}
          />
          {isHovering && !movie.poster_path && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '230px',
                height: '345px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                color: 'white',
                fontSize: '20px',
                borderRadius: '20px',
                pointerEvents: 'none', // Allows click events to pass through to the link
              }}
            >
              Poster is not available
            </Box>
          )}
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              textOverflow: 'ellipsis',
              width: 230,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              mt: 1,
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
