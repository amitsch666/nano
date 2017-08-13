const sessdata = (store, isServer, res) => {
  if (isServer) {
    if (res) {
      if (res.locals) {
        if (res.locals.user) {
					store.dispatch({ type: 'USER', payload: res.locals.user });
        }
      }
    }
  }
};

export default sessdata;