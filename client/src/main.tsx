import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const queryClient = new QueryClient();

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#FFFFFF",
  //   },
  // },
});
{
  /* <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router} />
</PersistGate>
</Provider> */
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster 
              position="top-right" 
              richColors 
              duration={3000} 
              theme='dark'
              icons={{
                success: <CheckCircleOutlineIcon />,
                info: <InfoIcon />,
                warning: <WarningIcon />,
                error: <ErrorIcon />,
              }}
            />
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
