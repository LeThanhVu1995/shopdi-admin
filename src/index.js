import React from 'react';
import { message } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { AuthProvider, LanguageProvider } from './context';
import UIProvider from './context/UiProvider';

message.config({
  top: 50,
  duration: 2,
  maxCount: 1,
  rtl: true,
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}
