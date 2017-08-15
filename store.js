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
    case 'TOGGLE_MODAL1':
      return {
        ...state,
        modal1_state: action.payload,
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
