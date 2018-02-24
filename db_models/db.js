const pgp = require('pg-promise')(/*initialization options*/);
const cache = new Map();

module.exports = function(db_url) {
	if (cache.has(db_url)) {
		return cache.get(db_url);
	}
	const instance = pgp(db_url);
	cache.set(db_url, instance);
	return instance;
};
