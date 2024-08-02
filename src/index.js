import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";



const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    mainColor: { main: '#00aeda' },
    yellowButton: { yellow: '#F8C514'},
    grayButton: { gray: '#D9D9D9' },
    likeButton: { red: '#E64C3C'},
    kakaoLogin: { kakao: '#FEE500'},
    navyColor: { navy: '#3869C7'}
  }
})

root.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
