import Cookies from 'universal-cookie';

let cookieval = null;

const sessdata = (req) => {
  if (typeof window !== 'undefined') {
    const cookies = new Cookies();
    if (cookies.get('authenticated')) {
      cookieval = cookies.get('authenticated').username;
    } else {
      cookieval = null;
    }
  } else if (req.headers.cookie) {
    const cookies = new Cookies(req.headers.cookie);
    if (cookies.get('authenticated')) {
      cookieval = cookies.get('authenticated').username;
    } else {
      cookieval = null;
    }
  }
  return cookieval;
};

export default sessdata;
