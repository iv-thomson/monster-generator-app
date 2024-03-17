import { AppBar, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { CreaturesPage } from './pages/CreaturesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar variant='dense'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography variant='h6' color='inherit' component='div'>
                Creature editor
              </Typography>

              <Link to='/'>Creatures dashboard</Link>
            </Stack>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<CreaturesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
