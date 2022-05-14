import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDeleteSweep, MdOutlineOpenInNew } from 'react-icons/md';

import { deleteFromCart } from '../../actions/cart';

// single cart item
const CartItem = ({
  product: { id, title, description, price, image },
  deleteFromCart,
}) => {
  return (
    <div className='product bg-white p-2 my-2'>
      <div className='product-info'>
        <Link to={`/products/${id}`} target='_blank' rel='noopener noreferrer'>
          <img src={image} alt={title} className='cart-img' />
        </Link>
        <div className='product-inner'>
          <Link
            to={`/products/${id}`}
            className='product-text text-dark small'
            target='_blank'
            rel='noopener noreferrer'
          >
            {title}
          </Link>
          <p className='product-text x-small mb'>
            {description.length > 168
              ? `${description.substring(0, 168)}...`
              : description}
          </p>
          <p className='product-text medium text-dark m-0'>
            <span className='small'>₹</span> {price}
          </p>
        </div>
      </div>

      <div className='product-action'>
        <Link
          to={`/products/${id}`}
          className='btn btn-dark'
          target='_blank'
          rel='noopener noreferrer'
        >
          <MdOutlineOpenInNew /> View Product
        </Link>
        <button
          type='button'
          className='btn btn-light'
          onClick={(e) => deleteFromCart(id)}
        >
          <MdDeleteSweep /> Delete from Cart
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  margin: PropTypes.number,
};

export default connect(null, {
  deleteFromCart,
})(CartItem);
