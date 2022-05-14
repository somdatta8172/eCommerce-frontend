import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

/*
alert = {
  id, msg, alertType
}
*/
// alertType possible values = success || danger || dark
// array of the alerts
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
