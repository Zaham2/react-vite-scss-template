import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { EventSourceProvider } from './lib/EventSource';
import './index.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EventSourceProvider>
      <App />
    </EventSourceProvider>
  </React.StrictMode>,
)
