var repository = require('../cloudant/repository');

module.exports.single = async function(id, params){
    return repository.single(id, params);
};

// module.exports.list = async function(type, params){
//     return repository.list(type, params);
// };