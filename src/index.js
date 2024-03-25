import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContextProvider } from 'context/context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          index
          element={
            <ContextProvider>
              <App />
            </ContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
)
