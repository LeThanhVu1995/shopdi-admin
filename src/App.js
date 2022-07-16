import React from 'react';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import Routes from './routes/routes';
import './i18n';
import 'flowbite';
import 'nprogress/nprogress.css';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
