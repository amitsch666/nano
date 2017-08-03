const fs = require('fs');
require('dotenv').config();
const crypto = require('crypto');

// get hash seed
const ep = String((new Date()).getTime());

// create hash
const logohash = crypto.createHash('md5').update(ep + process.env.NAVBAR_LOGO).digest('hex');
const csshash = crypto.createHash('md5').update(ep + process.env.CSS).digest('hex');

// rename logo file
fs.rename(`./static/img/${process.env.NAVBAR_LOGO}.svg`, `./static/img/${logohash}.svg`, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(`ERROR: ${err}`);
});

// update .env
fs.readFile('./.env', 'utf8', (err, data) => {
  if (err) throw err;
  // update new env value for logo
  let result = data.replace(`${process.env.NAVBAR_LOGO}`, `${logohash}`);
  // update new env value for css
  result = result.replace(`${process.env.CSS}`, `${csshash}`);
  // write updated data to .env
  fs.writeFile('./.env', result, 'utf8', (error) => {
    if (error) throw err;
  });
});
