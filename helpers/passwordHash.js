var crypto = require('crypto');
var mysalt = 'ut';

module.exports = function(password){
    return crypto.createHash('sha512').update(password+mysalt).digest('base64');
}