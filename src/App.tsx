import { CssBaseline } from '@mui/material';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreaturesPage } from './pages/CreaturesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { LocationPage } from './pages/LocationPage';
import { TopNav } from './components/TopNav';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#a8dadc', // A light, ethereal teal, reminiscent of magical waters or skies.
      main: '#457b9d', // A deep, mysterious blue, suggestive of the night sky or deep waters.
      dark: '#1d3557', // A dark navy, evoking the depths of the forest at night.
      contrastText: '#f1faee', // A soft off-white, for legible contrast on dark backgrounds.
    },
    secondary: {
      light: '#f4a261', // A warm, light orange, suggesting the glow of firelight or dawn.
      main: '#e76f51', // A rich, earthy red, reminiscent of autumn leaves or dragon scales.
      dark: '#d84315', // A deep, dark orange, evoking the warmth of a campfire or molten lava.
      contrastText: '#fefae0', // A pale yellow, offering a stark contrast to the secondary colors.
    },
  },
});

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopNav />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<CreaturesPage />} />
              <Route path='/location' element={<LocationPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
