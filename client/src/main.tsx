import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

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
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
