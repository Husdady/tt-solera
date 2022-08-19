// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import App from './App'

// Config
import reportWebVitals from './utils/reportWebVitals'

// Get main element
const mainElement = document.getElementById('root') as HTMLElement

// Create root application
const root = ReactDOM.createRoot(mainElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log)
