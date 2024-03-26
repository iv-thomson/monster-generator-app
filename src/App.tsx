import { CssBaseline } from '@mui/material';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreaturesPage } from './pages/CreaturesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { LocationPage } from './pages/LocationPage';
import { TopNav } from './components/TopNav';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <TopNav />
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
};

export default App;
