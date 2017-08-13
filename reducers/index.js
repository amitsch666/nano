import { combineReducers } from 'redux';
import UserReducer from './user';

const allReducers = combineReducers({
	user: UserReducer,
});

export default allReducers;
