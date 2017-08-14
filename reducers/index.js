import { combineReducers } from 'redux';
import UserReducer from './user';
import ModalsReducer from './modals';

const allReducers = combineReducers({
	user: UserReducer,
	modals: ModalsReducer,
});

export default allReducers;
