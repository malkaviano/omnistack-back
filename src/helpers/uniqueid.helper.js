const crypto = require('crypto');

module.exports = function hexId(n = 4) {
    return crypto.randomBytes(n).toString('HEX');
}