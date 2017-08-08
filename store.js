import { createStore } from 'redux';

const reducer = (state = {foo: ''}, action) => {
  switch (action.type) {
    case 'FOO':
      return {...state, foo: action.payload};
    default:
      return state
  }
};

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

// exports the functionality to initialize the store
// rather than exporting the store instance
export default makeStore;
