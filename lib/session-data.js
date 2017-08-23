const cookies = require('browser-cookies');
const jwt_decode = require('jwt-decode');
import axios from 'axios';

const sessdata = (store, isServer = false, res = null) => {
  if (isServer) {
    if (res) {
      if (res.locals) {
        if (res.locals.user) {
          store.dispatch({ type: 'USER', payload: res.locals.user });
        }
      }
    }
  } else {
		if(cookies.get('token')) {
			axios.get('/api/authentication/validate')
	      .then((response) => {
					const decodedJWT = jwt_decode(cookies.get('token'));
					store.dispatch({ type: 'USER', payload: decodedJWT });
				})
	      .catch((error) => {
	        store.dispatch({ type: 'USER', payload: null });
					store.dispatch({ type: 'TOGGLE_LOGIN_MODAL_STATE', payload: true });
	      });
		} else {
			store.dispatch({ type: 'USER', payload: null });
		}
	}
};

export default sessdata;
