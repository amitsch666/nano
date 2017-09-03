import { createStore } from 'redux';
import allReducers from './reducers';

const reducer = (state = { allReducers }, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'TOGGLE_LOGIN_MODAL_STATE':
      return {
        ...state,
        LoginModalState: action.payload,
      };
    case 'TOGGLE_CLICK_OUTSIDE_STATE':
      return {
        ...state,
        ClickOutsideState: action.payload,
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        NavPaneIsOpen: action.payload,
      };
    default:
      return state;
  }
};

const makeStore = initialState => (
  createStore(reducer, initialState)
);

// exports the functionality to initialize the store
// rather than exporting the store instance
export default makeStore;
