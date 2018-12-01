var db = require('../domain/database');
var User = require('./schemes/user').User; 

module.exports.single = function(id, params){
    return db.single(id, { ...params, type: 'user' });
};  

module.exports.insert = function(obj){
    let chatbot = new User({ ...obj });
    console.log(chatbot.getErrors());
};