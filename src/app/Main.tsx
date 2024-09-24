import { createTheme, ThemeProvider } from '@mui/material';
import { FruitsProvider } from '../context/fruits';
import { JarProvider } from '../context/jar';
import App from './App';

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <FruitsProvider>
        <JarProvider>
          <App />
        </JarProvider>
      </FruitsProvider>
    </ThemeProvider>
  );
};

export default Main;
