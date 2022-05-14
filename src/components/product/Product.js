import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  MdKeyboardArrowLeft,
  MdAddShoppingCart,
  MdDeleteSweep,
  MdStar,
  MdStarHalf,
  MdStarOutline,
} from 'react-icons/md';

import Spinner from '../layouts/Spinner';
import { getProduct } from '../../actions/product';
import { addToCart, deleteFromCart } from '../../actions/cart';

// product details screen
const Product = ({
  getProduct,
  addToCart,
  deleteFromCart,
  product: { product, loading },
  cart: { products: cartItems, loading: cartLoading },
}) => {
  const { productId } = useParams();

  // feting the product by id on page load
  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  // if rating = 3.5
  // then we need 3 fully filled star, 1 half filled star, 1 fully unfilled star
  const filledStar = product ? Math.floor(+product.rating) : 0;
  // if the rating number has decimal point
  // then half filled star is needed, otherwise not
  const halfFilledStar = product
    ? +product.rating === Math.floor(+product.rating)
      ? 0
      : 1
    : 0;

  return loading || product === null ? (
    <Spinner />
  ) : (
    <div>
      <Link to='/' className='back text-dark'>
        <MdKeyboardArrowLeft /> Back to Products
      </Link>
      <div className='product product-details my-2'>
        <img src={product.image} alt={product.title} />
        <div className='product-inner'>
          <p className='product-text text-dark large mt-05'>{product.title}</p>
          <p className='product-text large text-danger m-0'>
            <span className='small'>₹</span> {product.price}
          </p>
          <p className='product-text mt-05'>
            <p className='text-primary small m-icon-custom'>
              {new Array(filledStar).fill(0).map((_) => (
                <MdStar />
              ))}
              {halfFilledStar > 0 && <MdStarHalf />}
              {new Array(5 - (filledStar + halfFilledStar)).fill(0).map((_) => (
                <MdStarOutline />
              ))}
            </p>
            {product.rating}
          </p>
          <p className='product-text'>{product.description}</p>
          {!cartLoading ? (
            cartItems.filter((p) => p.id === product.id).length ? (
              <button
                type='button'
                className='btn btn-dark mt-2'
                onClick={(e) => deleteFromCart(product.id)}
              >
                <MdDeleteSweep /> Delete from Cart
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-primary mt-2'
                onClick={(e) =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    rating: product.rating,
                    image: product.image,
                  })
                }
              >
                <MdAddShoppingCart /> Add to Cart
              </button>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  getProduct,
  addToCart,
  deleteFromCart,
})(Product);
