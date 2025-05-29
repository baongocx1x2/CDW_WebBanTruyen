import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import MangaDetail from './pages/MangaDetail'
import Cart from './pages/Cart'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Search from './pages/Search'
import Checkout from './pages/checkout/Checkout'
import OrderHistory from './pages/user/OrderHistory'
import Profile from './pages/user/Profile'
import Manga from './pages/Manga'
import ReadManga from './pages/manga/ReadManga'
import AuthorDetail from "./pages/AuthorDetail";
import MangaNews from './pages/MangaNews';

// Import CSS
import './index.css'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="manga/:id" element={<MangaDetail />} />
        <Route path="manga/:mangaId/chapter/:chapterId" element={<ReadManga />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="manga" element={<Manga/>} />
        <Route path="author/:id" element={<AuthorDetail />} />
        <Route path="news" element={<MangaNews />} />
      </Route>
    </Routes>
  )
}

export default App