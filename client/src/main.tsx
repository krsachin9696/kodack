import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#FFFFFF",
  //   },
  // },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)