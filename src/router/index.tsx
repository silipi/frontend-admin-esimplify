import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoggedIn from '@/layouts/LoggedIn';
import LoggedOut from '@/layouts/LoggedOut';

import Home from '@/pages/Home';
import Login from '@/pages/Login';

import Products from '@/pages/Products';
import Product from '@/pages/Product';
import ProductCreate from '@/pages/ProductCreate';

import Providers from '@/pages/Providers';
import Provider from '@/pages/Provider';
import ProviderCreate from '@/pages/ProviderCreate';

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
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/create" element={<ProviderCreate />} />
          <Route path="/providers/:id" element={<Provider />} />
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
