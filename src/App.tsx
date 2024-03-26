import {
  AppBar,
  CssBaseline,
  Stack,
  Toolbar,
  Typography,
  Link,
  Button,
} from '@mui/material';

import { Logout } from '@mui/icons-material';
import {
  BrowserRouter,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom';
import { CreaturesPage } from './pages/CreaturesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { LocationPage } from './pages/LocationPage';
import { useDispatch } from 'react-redux';
import { logout } from './store/login';

function App() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar variant='dense'>
            <Stack
              sx={{ width: '100%' }}
              direction='row'
              justifyContent='space-between'
            >
              <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h5' color='inherit' component='div'>
                  Creature editor
                </Typography>

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
              {isAuthenticated && (
                <Button
                  variant='text'
                  startIcon={<Logout />}
                  sx={{ color: 'white', textTransform: 'initial' }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<CreaturesPage />} />
            <Route path='/location' element={<LocationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
