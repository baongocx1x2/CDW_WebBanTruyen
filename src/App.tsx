import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import Layout from './components/Layout/Layout.tsx';
import Home from './pages/Home.tsx';
import MangaDetail from './pages/MangaDetail.tsx';
import Cart from './pages/Cart.tsx';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './main/resources/static/css/style.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="manga/:id" element={<MangaDetail />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 