import { createStore } from 'redux';

const reducer = (state = { user_firstname: null }, action) => {
  switch (action.type) {
    case 'USER_FIRSTNAME':
      return { ...state, user_firstname: action.payload };
    default:
      return state;
  }
};

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

// exports the functionality to initialize the store
// rather than exporting the store instance
export default makeStore;
