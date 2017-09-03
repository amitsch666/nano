import axios from 'axios';

const cookies = require('browser-cookies');
const jwtDecode = require('jwt-decode');

const sessdata = (store, isServer = false, res = null, req = null) => {
  if (isServer) {
    if (res) {
      if (res.locals) {
        if (res.locals.user && req.cookies.token) {
          store.dispatch({ type: 'USER', payload: res.locals.user });
        }
      }
    }
  } else if (cookies.get('token')) {
    axios.get('/api/authentication/validate')
      .then(() => {
        const decodedJWT = jwtDecode(cookies.get('token'));
        store.dispatch({ type: 'USER', payload: decodedJWT });
      })
      .catch(() => {
        store.dispatch({ type: 'USER', payload: null });
        store.dispatch({ type: 'TOGGLE_LOGIN_MODAL_STATE', payload: true });
      });
  } else {
    store.dispatch({ type: 'USER', payload: null });
  }
};

export default sessdata;
