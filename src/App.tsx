import {
  AppBar,
  CssBaseline,
  Stack,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
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

function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar variant='dense'>
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
