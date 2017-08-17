import { combineReducers } from 'redux';
import user from './user';
import modals from './modals';
import navbar from './navbar';

const allReducers = combineReducers({
  user,
  modals,
  navbar,
});

export default allReducers;
