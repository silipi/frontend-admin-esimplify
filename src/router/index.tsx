import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoggedIn from '@/layouts/LoggedIn';
import LoggedOut from '@/layouts/LoggedOut';

import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Login from '@/pages/Login';
import Product from '@/pages/Product';
import ProductCreate from '@/pages/ProductCreate';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LoggedIn/private routes */}
        <Route element={<LoggedIn />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/:id" element={<Product />} />
        </Route>
        {/* LoggedOut/public routes */}
        <Route element={<LoggedOut />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
