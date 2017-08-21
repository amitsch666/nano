const cookies = require('browser-cookies');

const sessdata = (store, isServer, res) => {
  if (isServer) {
    if (res) {
      if (res.locals) {
        if (res.locals.user) {
          store.dispatch({ type: 'USER', payload: res.locals.user });
        }
      }
    }
  } else {
		store.dispatch({ type: 'USER', payload: JSON.parse(cookies.get('user')) });
	}
};

export default sessdata;
