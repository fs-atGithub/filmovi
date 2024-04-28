import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';
import { Menu, Brightness4, Brightness7 } from '@mui/icons-material';
import { Sidebar, Search } from '..';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const NavBar = () => {
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 257;
  const isAuthenticated = false;

  // Add an effect to handle clicks outside the open drawer.

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Only add this effect if the drawer is open
      if (!mobileOpen) return;

      // Check if the click was outside the drawer
      if (
        document.getElementById('drawer') &&
        !document.getElementById('drawer').contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [mobileOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '240px',
            [theme.breakpoints.down('sm')]: {
              marginLeft: 0,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            },
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={handleDrawerToggle}
              sx={{
                marginRight: theme.spacing(2),
                [theme.breakpoints.up('sm')]: {
                  display: 'none',
                },
              }}
            >
              <Menu />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => {}}>
              Login &nbsp; <Avatar />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to={`profile/:id`}
              onClick={() => {}}
            >
              {!isMobile && <>My movies &nbsp; </>}
              <Avatar width={30} height={30} />
            </Button>
          )}
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        {isMobile ? (
          <Drawer
            id="drawer"
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .drawerPaper': {
                width: drawerWidth,
              },
            }}
          >
            <Sidebar setMobileOpen={handleDrawerToggle} />
          </Drawer>
        ) : (
          <Drawer
            sx={{
              width: drawerWidth,
              '.MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            open
          >
            <Sidebar setMobileOpen={handleDrawerToggle} />
          </Drawer>
        )}
      </div>
    </>
  );
};

export default NavBar;
