import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MdShoppingCart, MdLibraryAdd } from 'react-icons/md';

// navbar component
const Navbar = ({ cart: { products: cartItems, loading } }) => {
  return (
    <nav className='navbar bg-dark'>
      <p className='small'>eCommerce</p>
      <ul>
        <li>
          <Link to='/'>Products</Link>
        </li>
        <li>
          <Link to='/add-product'>
            <MdLibraryAdd /> Add a product
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/cart'>
            <MdShoppingCart /> Cart
            <b className='text-primary'>[{!loading ? cartItems.length : 0}]</b>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(Navbar);
