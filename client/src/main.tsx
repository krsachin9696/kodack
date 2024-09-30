import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
// import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: Colors.PRIMARY,
  //   },
  // },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </ThemeProvider>
  </StrictMode>,
)
