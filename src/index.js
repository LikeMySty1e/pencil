import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MainStore from './store/MainStore';

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
      main: new MainStore()
    }}>
    <App />
    </Context.Provider>
);
