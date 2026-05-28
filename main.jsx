import React from 'react'
import ReactDOM from 'react-dom/client'
import HourglassGallery from './HourglassGallery'
import HourglassAdmin from './HourglassAdmin'

const isAdmin = window.location.pathname === '/admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  isAdmin ? <HourglassAdmin /> : <HourglassGallery />
)
