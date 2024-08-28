import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductosMain from './components/productos/ProductosMain'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductosMain />
  </React.StrictMode>
)
