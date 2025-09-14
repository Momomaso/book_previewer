import React from 'react'
import ReactDOM from 'react-dom/client'
import BookPreviewer from './App.jsx'
import './index.css'   // صح كده

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookPreviewer />
  </React.StrictMode>,
)
