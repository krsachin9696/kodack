import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: 'gray',
            opacity: 0.6,
            color: 'white',
          },
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster 
            position="top-right" 
            richColors 
            duration={3000} 
            icons={{
              success: <CheckCircleOutlineIcon />,
              info: <InfoIcon />,
              warning: <WarningIcon />,
              error: <ErrorIcon />,
            }}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
