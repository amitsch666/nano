const cookies = require('browser-cookies');
// import axios from 'axios';

const deepEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;
  var propsInA = 0, propsInB = 0;
  for (var prop in a)
    propsInA += 1;
  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }
  return propsInA == propsInB;
};

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
		const userCookie = Object.create(JSON.parse(cookies.get('user')));
		console.log(userCookie);
		delete userCookie.hash;
		delete userCookie.salt;
		console.log(userCookie);
		console.log(JSON.parse(cookies.get('user')));
		const sessChanged = (userCookie && deepEqual(store.getState().user, userCookie));
		if(sessChanged) {
			console.log('cookie tampered');
		}
		// if sessChanged is true, it means either the user is no more logged in, a new user has logged in, or the cookie has been tampered with.
		store.dispatch({ type: 'USER', payload: JSON.parse(cookies.get('user')) });
	}
};

export default sessdata;
