import { nanoid } from 'nanoid';

import { SET_ALERT, REMOVE_ALERT } from './types';

// func for showing alert msg
// alerts will be removed automatically after 3 secs
export const setAlert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = nanoid();

    // set the alert
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
      },
    });

    // remove the alert after 5s
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };
