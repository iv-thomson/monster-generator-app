import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Link,
  Button,
} from '@mui/material';

import { Logout } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/login';

const Logo = () => (
  <Typography variant='h5' color='inherit' component='div'>
    Monster generator
  </Typography>
);

export const TopNav = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  if (!isAuthenticated) {
    return (
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          <Logo />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position='fixed'>
      <Toolbar variant='dense'>
        <Stack
          sx={{ width: '100%' }}
          direction='row'
          justifyContent='space-between'
        >
          <Stack direction='row' spacing={2} alignItems='center'>
            <Logo />
            <Link
              to='/'
              component={RouterLink}
              color='inherit'
              underline='hover'
            >
              Creatures dashboard
            </Link>
            <Link
              to='/location'
              component={RouterLink}
              color='inherit'
              underline='hover'
            >
              Locations dashboard
            </Link>
          </Stack>

          <Button
            variant='text'
            startIcon={<Logout />}
            sx={{ color: 'white', textTransform: 'initial' }}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
