import axios from 'axios';

import { API_URL } from '../env';
import { setAlert } from './alert';
import { deleteFromCart } from './cart';
import {
  START_LOADING,
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_ERROR,
} from './types';

// for getting all products
export const getAllProducts =
  (sortBy = 'id', sortOrder = 'desc') =>
  async (dispatch) => {
    try {
      dispatch({
        type: START_LOADING,
      });
      // get all products
      const res = await axios.get(`${API_URL}/products`);

      setTimeout(() => {
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data,
          sortBy,
          sortOrder,
        });
      }, 500);
    } catch (error) {
      // send the error data to reducer
      dispatch({
        type: PRODUCTS_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// for getting a product by product id
export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING,
    });

    // productId = id of the product
    // get the product by id
    const res = await axios.get(`${API_URL}/products/${productId}`);

    setTimeout(() => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    }, 500);
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for adding a new product
/* 
  formdata = {
    id, title, description, price, image 
  }
*/
export const addProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING,
    });

    // add the product
    const res = await axios.post(`${API_URL}/products`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    // send the new product to reducer
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    // show an alert
    dispatch(setAlert('Product created successfully', 'success'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for editing a new product
// productId = id of the product
/* 
  formdata = {
    id, title, description, price, image 
  }
*/
export const editProduct = (productId, formData) => async (dispatch) => {
  try {
    // add the product
    const res = await axios.patch(
      `${API_URL}/products/${productId}`,
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // send the new product to reducer
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    // show an alert
    dispatch(setAlert('Product updated successfully', 'success'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for removing a product
// productId = id of the product
export const deleteProduct = (productId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to remove this product?')) {
    try {
      // remove the product
      await axios.delete(`${API_URL}/products/${productId}`);

      // send the deleted product id to reducer
      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });

      // show an alert
      dispatch(deleteFromCart(productId));
      dispatch(setAlert('Product removed successfully', 'dark'));
    } catch (error) {
      // send the error data to reducer
      dispatch({
        type: PRODUCTS_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
