import { createStore } from 'redux';
import allReducers from './reducers';

const reducer = (state = { allReducers }, action) => {
  switch (action.type) {
		case 'USER':
			return {
				...state,
				user_firstname: action.payload.firstName,
				user_lastname: action.payload.lastName,
				user_email: action.payload.email,
			};
			break;
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
