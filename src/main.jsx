import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ProductContextProvider } from './contexts/ProductContext.jsx'
import App from './App.jsx'
import './styles/normalize.css'
import './styles/index.css'
import './styles/utilities.css'
import './styles/navbar.css'
import './styles/footer.css'
import './styles/product.css'
import './styles/home.css'
import './styles/layout.css'
import './styles/shopping-cart.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
