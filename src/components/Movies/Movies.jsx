import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FeaturedMovie, MovieList, Pagination } from '..';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const theme = useTheme();

  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 15 : 20;
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured.';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
