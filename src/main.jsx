import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
// Drop the build-time pre-rendered copy (kept for search engines) before the app draws the page.
if (root.hasAttribute('data-prerendered')) { root.textContent = ''; root.removeAttribute('data-prerendered') }

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
