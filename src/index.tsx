import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';




const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>

        <App />
      </Provider>,
    </React.StrictMode >
  );
} else {
  console.error("Failed to find the root element. Ensure there is an element with id 'root' in your HTML.");
}
