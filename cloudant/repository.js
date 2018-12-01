var db = require('./cloudant');

module.exports.single = function(id, params){
    return db.Atlas.get(id, params);
};