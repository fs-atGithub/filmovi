import React from 'react';
import { MovieList } from '..';
import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
} from '@mui/material';
import { Movie as MovieIcon, Language, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import { useDispatch } from 'react-redux';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import placeholderImage from '../../assets/images/Filmpire.jpg';

const MovieInformation = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({
    list: '/recommendations',
    movie_id: id,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something is wrong or data is missing</Link>
      </Box>
    );
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const year = data.release_date
    ? data.release_date.split('-')[0]
    : 'Unknown year';
  const language =
    data.spoken_languages && data.spoken_languages.length > 0
      ? data.spoken_languages[0].name
      : 'Unknown';

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          flexWrap: 'wrap',
        },
      }}
    >
      <Grid item sm={12} lg={4}>
        <Box
          component="img"
          sx={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
            width: '80%',
            [theme.breakpoints.down('md')]: {
              margin: '0 auto',
              width: '50%',
            },
            [theme.breakpoints.down('sm')]: {
              margin: '0 auto',
              width: '100%',
              height: '350px',
              marginBottom: '30px',
            },
          }}
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
              : placeholderImage
          }
          alt={data.title || 'Movie Poster'}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data.title} - ({year}) - {data.origin_country}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data.tagline} <br /> Status | {data.status}
        </Typography>

        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px 0 !important',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              flexWrap: 'wrap',
            },
          }}
        >
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {formatRuntime(data.runtime)} | Language: {language}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: '10px 0 !important',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {data?.genres?.map((genre, index) => (
            <Button
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                [theme.breakpoints.down('sm')]: {
                  padding: '0.5rem 1rem',
                },
              }}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
                navigate('/');
              }}
            >
              <img
                alt="genre-icons"
                src={genreIcons[genre.name.toLowerCase()]}
                style={{
                  filter: theme.palette.mode === 'dark' && 'invert(1)',
                  marginRight: '10px',
                }}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Button>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, index) =>
                  character.profile_path && (
                    <Grid
                      key={index}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        style={{
                          width: '100%',
                          maxWidth: '7em',
                          height: '8em',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <ButtonGroup size="small" variant="outlined">
                <Button startIcon={<ArrowBack />} component={Link} to="/">
                  Back
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    style={{ textDecoration: 'none' }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
    </Grid>
  );
};

export default MovieInformation;
