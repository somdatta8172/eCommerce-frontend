import {
  START_LOADING,
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_ERROR,
} from '../actions/types';

// product[object]: currently selected product
// products[array]: list of all the products
const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.sort((first, second) =>
          action.sortOrder === 'desc'
            ? +second[action.sortBy] - +first[action.sortBy]
            : +first[action.sortBy] - +second[action.sortBy]
        ),
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        products: [
          action.payload,
          ...state.products.filter(
            (product) => product.id !== action.payload.id
          ),
        ],
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
