import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';
import Alert from './components/layouts/Alert';
import Navbar from './components/layouts/Navbar';
import NotFound from './components/layouts/NotFound';
import Products from './components/products/Products';
import Product from './components/product/Product';
import AddProduct from './components/product/AddProduct';
import Cart from './components/cart/Cart';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path='/' element={<Products />} />
              <Route exact path='/products/:productId' element={<Product />} />
              <Route exact path='/add-product' element={<AddProduct />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
