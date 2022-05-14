import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdEdit,
  MdDeleteForever,
  MdAddShoppingCart,
  MdDeleteSweep,
  MdStar,
  MdStarHalf,
  MdStarOutline,
} from 'react-icons/md';

import { editProduct, deleteProduct } from '../../actions/product';
import { addToCart, editCart, deleteFromCart } from '../../actions/cart';

const ProductItem = ({
  product: {
    id,
    title: pTitle,
    description: pDescription,
    price: pPrice,
    rating: pRating,
    image,
  },
  cart: { products: cartItems, loading },
  editProduct,
  deleteProduct,
  addToCart,
  editCart,
  deleteFromCart,
}) => {
  const initialData = {
    title: pTitle,
    description: pDescription,
    price: pPrice,
    rating: pRating,
  };

  const [edit, setEdit] = useState(false); // flag to indicate whether product is being edited or not
  const [formData, setFormData] = useState(initialData);
  const { title, description, price, rating } = formData;

  // if rating = 3.5
  // then we need 3 fully filled star, 1 half filled star, 1 fully unfilled star
  const filledStar = Math.floor(+rating);
  // if the rating number has decimal point
  // then half filled star is needed, otherwise not
  const halfFilledStar = +rating === Math.floor(+rating) ? 0 : 1;

  // for title -> {prevData, title: value}
  const onChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  return (
    <div className='product bg-white p-2 my-2'>
      <div className='product-info'>
        <Link to={`/products/${id}`} target='_blank' rel='noopener noreferrer'>
          <img src={image} alt={title} />
        </Link>

        {/* if edit = true, then show input fields, else show the product data */}
        {edit ? (
          <div className='product-inner'>
            <input
              id='title'
              type='text'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              placeholder='Product Name'
              required
            ></input>
            <textarea
              id='description'
              name='description'
              cols='30'
              rows='5'
              value={description}
              onChange={(e) => onChange(e)}
              placeholder='Product description'
              required
            ></textarea>
            <div className='input-inner'>
              <p className='x-small'>Price:</p>
              <input
                id='price'
                type='number'
                name='price'
                value={price}
                onChange={(e) => onChange(e)}
                placeholder='Product Price'
                required
              ></input>
              <p className='x-small'>Rating [0-5]:</p>
              <input
                id='rating'
                type='number'
                name='rating'
                value={rating}
                onChange={(e) => onChange(e)}
                placeholder='Product Rating'
                required
              ></input>
            </div>
          </div>
        ) : (
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
            <p className='product-text large text-danger m-0'>
              <span className='small'>₹</span> {price}
            </p>
            <p className='product-text mt-05'>
              <span className='text-primary small m-icon-custom'>
                {new Array(filledStar).fill(0).map((_, i) => (
                  <MdStar key={i} />
                ))}
                {halfFilledStar > 0 && <MdStarHalf />}
                {new Array(5 - (filledStar + halfFilledStar))
                  .fill(0)
                  .map((_, i) => (
                    <MdStarOutline key={i} />
                  ))}
              </span>
              {rating}
            </p>
          </div>
        )}
      </div>

      {/* if edit = true, then show save and cancel buttons, else show the normal action buttons */}
      {edit ? (
        <div className='product-action'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={(e) => {
              editProduct(id, {
                title: formData.title,
                description: formData.description,
                price: +formData.price,
                rating: +formData.rating,
              });
              editCart({
                id,
                title: formData.title,
                description: formData.description,
                price: +formData.price,
                rating: +formData.rating,
                image,
              });
              setEdit(false);
            }}
          >
            Save
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={(e) => {
              setEdit(false);
              setFormData(initialData);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className='product-action'>
          {!loading ? (
            cartItems.filter((product) => product.id === id).length ? (
              <button
                type='button'
                className='btn btn-dark'
                onClick={(e) => deleteFromCart(id)}
              >
                <MdDeleteSweep /> Delete from Cart
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-primary'
                onClick={(e) =>
                  addToCart({
                    id,
                    title,
                    description,
                    price: +price,
                    rating: +rating,
                    image,
                  })
                }
              >
                <MdAddShoppingCart /> Add to Cart
              </button>
            )
          ) : (
            ''
          )}
          <button
            type='button'
            className='btn btn-light'
            onClick={(e) => {
              setEdit(true);
            }}
          >
            <MdEdit /> Edit Product
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => {
              deleteProduct(id);
            }}
          >
            <MdDeleteForever /> Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  editProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  margin: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  editProduct,
  deleteProduct,
  addToCart,
  editCart,
  deleteFromCart,
})(ProductItem);
