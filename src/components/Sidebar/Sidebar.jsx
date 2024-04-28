/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';

import genreIcons from '../../assets/genres';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const theme = useTheme();

  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link
        to="/"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10% 0',
        }}
      >
        <img
          style={{
            width: '70%',
            maxWidth: '200px',
          }}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            style={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
            to="/"
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  alt="genre icon"
                  src={genreIcons[label.toLowerCase()]}
                  style={{
                    filter: theme.palette.mode === 'dark' && 'invert(1)',
                  }}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
              to="/"
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <img
                    alt="genre icon"
                    src={genreIcons[name.toLowerCase()]}
                    style={{
                      filter: theme.palette.mode === 'dark' && 'invert(1)',
                    }}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
