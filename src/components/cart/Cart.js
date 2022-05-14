import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import CartItem from './CartItem';

// Cart screen with list of cart items
const Cart = ({ cart: { products, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='product'>
        <h1 className='medium text-dark text-up'>Your Cart</h1>
        <button type='button' className='btn btn-light btn-rounded' disabled>
          Subtotal ({products.length} {products.length > 1 ? 'items' : 'item'})
          : ₹{' '}
          {products
            .reduce((previous, current) => previous + +current.price, 0)
            .toFixed(2)}
        </button>
      </div>

      <div className='products'>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
