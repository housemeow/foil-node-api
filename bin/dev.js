require('dotenv/config');
const app = require('../src/app.js');

app.listen(3000, () => {
  console.log('Foil api server listen in port 3000.');
});
